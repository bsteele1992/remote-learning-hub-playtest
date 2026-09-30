/* Large-Cohort Remote Design — shared shell (offline / file:// safe)
   HARD-GATE: Practice unlocks only after teachDone + modelDone (soft unlock is not available). */
(function (global) {
  const STORE = 'lcRemoteDesign_v13';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); }
    catch { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(STORE, JSON.stringify(data)); } catch (_) {}
  }

  function defaultModule() {
    return {
      completed: false,
      screens: {},
      answers: {},
      teachDone: false,
      modelDone: false,
      checks: {}
    };
  }

  function getModule(id) {
    const d = load();
    return (d.modules && d.modules[id])
      ? Object.assign(defaultModule(), d.modules[id])
      : defaultModule();
  }
  function setModule(id, patch) {
    const d = load();
    if (!d.modules) d.modules = {};
    d.modules[id] = Object.assign(getModule(id), patch, { updated: Date.now() });
    save(d);
    return d.modules[id];
  }

  function getAllModules() {
    return (load().modules) || {};
  }

  function isFilled(el) {
    if (!el) return false;
    const tag = (el.tagName || '').toLowerCase();
    if (tag === 'select') return String(el.value || '').trim().length > 0;
    if (el.type === 'checkbox' || el.type === 'radio') return !!el.checked;
    return String(el.value || '').trim().length > 0;
  }

  function practiceReady(root) {
    const fields = [...(root || document).querySelectorAll('[data-required-practice]')];
    if (!fields.length) return false;
    return fields.every(isFilled);
  }

  /* —— M7 —— */
  const M7_WORKSPACE_IDS = ['m7case', 'm7obj', 'm7pat', 'm7dir', 'm7form', 'm7sum'];
  const M7_RADIO_GROUPS = ['r_scale', 'r_app', 'r_assess', 'r_int', 'r_dir'];
  const M7_EVIDENCE_IDS = ['e_scale', 'e_app', 'e_assess', 'e_int', 'e_dir'];

  const M7_GATE_FAIL_MSG =
    'Cannot proceed: fill required workspace fields (case, objective, pattern, directions, formative, summative) and check the honesty affirmation. Empty template, unreformed classroom pattern, or quiz-only-for-application cannot proceed.';

  const M7_COMPLETE_FAIL_MSG =
    'Cannot mark complete until honesty affirmation is checked, required workspace fields are filled, and all five self-score radios plus evidence quotes are present.';

  const HARD_GATE_MSG =
    'Practice is locked until you finish Teach and the Worked example/model. Use Next on those screens (or the step nav) to mark them viewed.';

  function m7WorkspaceReady() {
    return M7_WORKSPACE_IDS.every(id => isFilled(document.getElementById(id)));
  }
  function m7HonestyReady() {
    const gate = document.getElementById('m7gate');
    return !!(gate && gate.checked);
  }
  function m7SubmitReady() {
    return m7HonestyReady() && m7WorkspaceReady();
  }
  function m7RadiosReady() {
    return M7_RADIO_GROUPS.every(name => !!document.querySelector(`input[name="${name}"]:checked`));
  }
  function m7EvidenceReady() {
    return M7_EVIDENCE_IDS.every(id => isFilled(document.getElementById(id)));
  }
  function m7CompleteReady() {
    return m7SubmitReady() && m7RadiosReady() && m7EvidenceReady();
  }

  function showGateMsg(el, text) {
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    el.removeAttribute('hidden');
  }
  function clearGateMsg(el) {
    if (!el) return;
    el.textContent = '';
    el.hidden = true;
  }

  function initShell(opts) {
    const {
      moduleId, screens, progressEl, fillEl, stepNav, onScreen
    } = opts;
    let idx = 0;
    const state = getModule(moduleId);
    const isM7 = moduleId === 'm7';

    const teachIdx = screens.indexOf('s2');
    const modelIdx = screens.indexOf('s3');
    const practiceIdx = screens.indexOf('s4');
    const M7_SUBMIT_IDX = screens.indexOf('s3');

    function gatePassed() {
      return !!(state.teachDone && state.modelDone);
    }

    function practiceScreenIndex() {
      return practiceIdx;
    }

    function markTeachIfLeaving(fromIdx) {
      if (isM7) return;
      if (fromIdx === teachIdx) {
        state.teachDone = true;
        setModule(moduleId, { teachDone: true });
      }
      if (fromIdx === modelIdx) {
        state.modelDone = true;
        setModule(moduleId, { modelDone: true });
      }
    }

    function updateGateChrome() {
      if (isM7) return;
      const locked = !gatePassed();
      const lockBanner = document.getElementById('practice-lock');
      const practicePanel = document.getElementById('s4');
      if (lockBanner) {
        if (locked) {
          lockBanner.hidden = false;
          lockBanner.removeAttribute('hidden');
        } else {
          lockBanner.hidden = true;
        }
      }
      if (practicePanel) {
        practicePanel.classList.toggle('is-locked', locked);
        practicePanel.querySelectorAll('[data-required-practice], [data-persist], [data-debrief]').forEach(el => {
          if (locked) {
            el.setAttribute('disabled', 'disabled');
            el.setAttribute('aria-disabled', 'true');
          } else {
            el.removeAttribute('disabled');
            el.removeAttribute('aria-disabled');
          }
        });
      }
      if (stepNav) {
        stepNav.querySelectorAll('.nav-step').forEach((btn, n) => {
          const needsGate = practiceIdx >= 0 && n >= practiceIdx;
          if (needsGate && locked) {
            btn.classList.add('locked');
            btn.setAttribute('aria-disabled', 'true');
          } else {
            btn.classList.remove('locked');
            btn.removeAttribute('aria-disabled');
          }
        });
      }
      /* Enable Continue-to-practice when teach is done and learner is ON the
         worked-example screen (or model already done). Disabling until modelDone
         caused a Safari dead-end: the only s3 Continue could not be clicked to
         mark modelDone. HARD-GATE still blocks Practice until teach+model done. */
      document.querySelectorAll('[data-to-practice]').forEach(btn => {
        const canFinishModel = !!(state.teachDone && (state.modelDone || idx === modelIdx));
        btn.disabled = !canFinishModel;
        btn.setAttribute('aria-disabled', canFinishModel ? 'false' : 'true');
      });
    }

    function canGoTo(targetIdx) {
      if (isM7) {
        if (targetIdx > M7_SUBMIT_IDX && M7_SUBMIT_IDX >= 0 && !m7SubmitReady()) {
          const msg = document.getElementById('m7-gate-msg');
          showGateMsg(msg, M7_GATE_FAIL_MSG);
          if (idx !== M7_SUBMIT_IDX) {
            idx = M7_SUBMIT_IDX;
            paint();
          }
          return false;
        }
        return true;
      }

      /* HARD-GATE: cannot jump to Practice (s4) or later until teach+model done */
      if (practiceIdx >= 0 && targetIdx >= practiceIdx && !gatePassed()) {
        const alertEl = document.getElementById('hard-gate-alert');
        showGateMsg(alertEl, HARD_GATE_MSG);
        /* Prefer landing on Model if teach done, else Teach */
        const fallback = state.teachDone ? (modelIdx >= 0 ? modelIdx : teachIdx) : teachIdx;
        if (fallback >= 0 && idx !== fallback) {
          idx = fallback;
          paint();
        }
        return false;
      }
      return true;
    }

    function paint() {
      document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
      const el = document.getElementById(screens[idx]);
      if (el) el.classList.add('active');
      document.querySelectorAll('.nav-step').forEach((btn, n) => {
        btn.classList.toggle('active', n === idx);
        btn.classList.toggle('done', n < idx || (state.screens && state.screens[screens[n]]));
        btn.setAttribute('aria-current', n === idx ? 'step' : 'false');
      });
      const pct = Math.round(((idx + 1) / screens.length) * 100);
      if (fillEl) fillEl.style.width = pct + '%';
      if (progressEl) progressEl.textContent = (idx + 1) + ' / ' + screens.length;
      state.screens = state.screens || {};
      state.screens[screens[idx]] = true;
      setModule(moduleId, { screens: state.screens });
      updateGateChrome();
      if (typeof onScreen === 'function') onScreen(screens[idx], idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let emptyPracticeWarned = false;
    function go(i) {
      if (i < 0 || i >= screens.length) return;
      /* Mark teach/model when advancing past S2/S3 BEFORE gate check */
      if (i > idx) markTeachIfLeaving(idx);
      updateGateChrome();
      /* Minor 5: one soft warn if leaving Practice with empty required fields (does not block) */
      if (!isM7 && practiceIdx >= 0 && idx === practiceIdx && i > idx && !practiceReady() && !emptyPracticeWarned) {
        emptyPracticeWarned = true;
        window.alert('A few Practice fields are still empty. You can keep going, or fill them before you mark the module complete.');
      }
      if (!canGoTo(i)) return;
      clearGateMsg(document.getElementById('hard-gate-alert'));
      idx = i;
      paint();
    }

    function updateCompleteButton() {
      const mark = document.querySelector('[data-complete-module]');
      if (!mark) return;
      const ok = isM7 ? m7CompleteReady() : practiceReady();
      mark.disabled = !ok;
      if (isM7) {
        const cmsg = document.getElementById('m7-complete-msg');
        if (ok) clearGateMsg(cmsg);
        if (m7SubmitReady()) clearGateMsg(document.getElementById('m7-gate-msg'));
      }
    }

    /* Bare next (not gated) */
    document.querySelectorAll('[data-next]:not([data-gate-next]):not([data-to-practice])').forEach(btn => {
      btn.addEventListener('click', () => go(idx + 1));
    });
    document.querySelectorAll('[data-prev]').forEach(btn => {
      btn.addEventListener('click', () => go(idx - 1));
    });
    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.getAttribute('data-goto');
        const i = screens.indexOf(t);
        if (i >= 0) go(i);
      });
    });
    if (stepNav) {
      stepNav.querySelectorAll('.nav-step').forEach((btn, n) => {
        btn.addEventListener('click', () => go(n));
      });
    }

    /* Explicit Continue-to-practice control — HARD-GATE */
    document.querySelectorAll('[data-to-practice]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        markTeachIfLeaving(idx);
        updateGateChrome();
        if (!gatePassed()) {
          showGateMsg(document.getElementById('hard-gate-alert'), HARD_GATE_MSG);
          return;
        }
        const i = practiceScreenIndex();
        if (i >= 0) go(i);
      });
    });

    /* M7 Submit → Self-score HARD gate */
    document.querySelectorAll('[data-gate-next]').forEach(btn => {
      const gateKey = btn.getAttribute('data-gate-next');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (gateKey === 'm7-submit') {
          const msg = document.getElementById('m7-gate-msg');
          if (!m7SubmitReady()) {
            showGateMsg(msg, M7_GATE_FAIL_MSG);
            return;
          }
          clearGateMsg(msg);
          go(idx + 1);
          return;
        }
        go(idx + 1);
      });
    });

    /* Persist text/select fields */
    document.querySelectorAll('[data-persist]').forEach(field => {
      const key = field.getAttribute('data-persist');
      if (state.answers && state.answers[key] != null) field.value = state.answers[key];
      const persist = () => {
        state.answers = state.answers || {};
        state.answers[key] = field.value;
        setModule(moduleId, { answers: state.answers });
        updateCompleteButton();
      };
      field.addEventListener('input', persist);
      field.addEventListener('change', persist);
    });

    /* Persist checkboxes */
    document.querySelectorAll('[data-persist-check]').forEach(box => {
      const key = box.getAttribute('data-persist-check');
      if (state.checks && state.checks[key]) box.checked = true;
      box.addEventListener('change', () => {
        state.checks = state.checks || {};
        state.checks[key] = box.checked;
        setModule(moduleId, { checks: state.checks });
        updateCompleteButton();
      });
    });

    /* Persist radios */
    document.querySelectorAll('input[type="radio"][data-persist-radio]').forEach(radio => {
      const group = radio.name;
      if (state.answers && state.answers[group] === radio.value) radio.checked = true;
      radio.addEventListener('change', () => {
        if (!radio.checked) return;
        state.answers = state.answers || {};
        state.answers[group] = radio.value;
        setModule(moduleId, { answers: state.answers });
        updateCompleteButton();
      });
    });

    document.querySelectorAll('[data-complete-module]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isM7) {
          if (!m7CompleteReady()) {
            showGateMsg(document.getElementById('m7-complete-msg'), M7_COMPLETE_FAIL_MSG);
            return;
          }
        } else if (!practiceReady()) {
          return;
        }
        setModule(moduleId, { completed: true });
        state.completed = true;
        const banner = document.getElementById('complete-banner');
        if (banner) {
          banner.hidden = false;
          banner.removeAttribute('hidden');
        }
        btn.disabled = true;
        btn.textContent = 'Module complete';
      });
    });

    /* Restore completed banner */
    if (state.completed) {
      const banner = document.getElementById('complete-banner');
      if (banner) {
        banner.hidden = false;
        banner.removeAttribute('hidden');
      }
      const mark = document.querySelector('[data-complete-module]');
      if (mark) {
        mark.disabled = true;
        mark.textContent = 'Module complete';
      }
    }

    updateGateChrome();
    updateCompleteButton();
    paint();

    return {
      go,
      getState: () => state,
      gatePassed,
      refresh: () => { updateGateChrome(); updateCompleteButton(); }
    };
  }

  function initHub(opts) {
    const listEl = opts.listEl;
    const fillEl = opts.fillEl;
    const labelEl = opts.labelEl;
    const modules = opts.modules || [];
    const stored = getAllModules();
    let done = 0;
    modules.forEach((m, i) => {
      const st = stored[m.id] || {};
      const item = listEl && listEl.querySelector(`[data-module="${m.id}"]`);
      if (!item) return;
      if (st.completed) {
        item.classList.add('is-complete');
        done += 1;
        const status = item.querySelector('.lesson-status');
        if (status) status.textContent = 'Complete';
      } else if (st.screens && Object.keys(st.screens).length) {
        item.classList.add('is-active');
        const status = item.querySelector('.lesson-status');
        if (status) status.textContent = 'In progress';
      }
    });
    const pct = modules.length ? Math.round((done / modules.length) * 100) : 0;
    if (fillEl) fillEl.style.width = pct + '%';
    if (labelEl) labelEl.textContent = done + ' / ' + modules.length + ' complete';
  }

  global.LCApp = {
    initShell,
    initHub,
    getModule,
    setModule,
    getAllModules,
    practiceReady,
    m7CompleteReady
  };
})(window);
