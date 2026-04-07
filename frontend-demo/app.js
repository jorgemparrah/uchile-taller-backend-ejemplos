// ============================================================
// CONFIGURACIÓN
// Cambiar esta URL cuando uses ngrok:
//   const API_URL = 'https://xxxx.ngrok-free.app';
// ============================================================
const API_URL = 'http://localhost:3000';

// Mostrar la URL activa en el header
document.getElementById('api-url-label').textContent = API_URL;


// ============================================================
// ENVIAR MENSAJE (POST /messages)
// ============================================================
async function sendMessage() {
  const name      = document.getElementById('input-name').value.trim();
  const message   = document.getElementById('input-message').value.trim();
  const type      = document.getElementById('input-type').value;
  const important = document.getElementById('input-important').checked;

  const feedback  = document.getElementById('send-feedback');
  const btn       = document.getElementById('btn-send');
  const btnText   = document.getElementById('btn-send-text');
  const btnLoading = document.getElementById('btn-send-loading');

  // Validación mínima en frontend
  if (!name || !message) {
    showFeedback(feedback, 'error', 'Por favor completa el nombre y el mensaje.');
    return;
  }

  // Estado: enviando
  btn.disabled = true;
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  hideFeedback(feedback);

  try {
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message, type, important }),
    });

    const data = await res.json();

    if (!res.ok) {
      // El backend devuelve errores de validación en data.message (array o string)
      const errors = Array.isArray(data.message) ? data.message : [data.message ?? 'Error desconocido.'];
      const errorText = errors.map(translateError).join('\n');
      showFeedback(feedback, 'error', `Revisa los campos:\n${errorText}`);
      return;
    }

    showFeedback(feedback, 'success', `Mensaje guardado. ID asignado: ${data.id}`);
    clearForm();
    loadMessages();

  } catch {
    showFeedback(feedback, 'error', 'No se pudo conectar con el backend. ¿Está corriendo?');
  } finally {
    btn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
  }
}


// ============================================================
// CARGAR MENSAJES (GET /messages)
// ============================================================
async function loadMessages() {
  const list    = document.getElementById('messages-list');
  const loading = document.getElementById('list-loading');
  const error   = document.getElementById('list-error');
  const empty   = document.getElementById('list-empty');
  const count   = document.getElementById('msg-count');

  // Mostrar estado cargando
  list.innerHTML = '';
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  empty.classList.add('hidden');
  count.textContent = '';

  try {
    const res  = await fetch(`${API_URL}/messages`);
    const data = await res.json();

    loading.classList.add('hidden');

    if (!data.length) {
      empty.classList.remove('hidden');
      return;
    }

    count.textContent = data.length;

    // Mostrar más reciente primero
    [...data].reverse().forEach((msg) => {
      const li = document.createElement('li');
      li.className = `msg-card${msg.important ? ' msg-card--important' : ''}`;
      li.innerHTML = buildMessageHTML(msg);
      list.appendChild(li);
    });

  } catch {
    loading.classList.add('hidden');
    error.classList.remove('hidden');
  }
}


// ============================================================
// HELPERS
// ============================================================

function buildMessageHTML(msg) {
  const importantBadge = msg.important
    ? `<span class="badge badge--important">★ importante</span>`
    : '';

  return `
    <div class="msg-top">
      <span class="msg-name">${escapeHtml(msg.name)}</span>
      <span class="badge badge--${msg.type}">${msg.type}</span>
      ${importantBadge}
    </div>
    <p class="msg-text">${escapeHtml(msg.message)}</p>
  `;
}

function clearForm() {
  document.getElementById('input-name').value = '';
  document.getElementById('input-message').value = '';
  document.getElementById('input-type').value = 'saludo';
  document.getElementById('input-important').checked = false;
}

function showFeedback(el, type, text) {
  // Usar innerText para preservar saltos de línea en mensajes de error multi-línea
  el.innerText = text;
  el.className = `feedback ${type}`;
  el.classList.remove('hidden');
}

function hideFeedback(el) {
  el.classList.add('hidden');
  el.className = 'feedback hidden';
}

// Formatea cada error con viñeta para mostrarlo en lista
function translateError(msg) {
  return `• ${msg}`;
}

// Prevenir XSS al insertar texto del usuario en el DOM
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ============================================================
// INICIALIZAR
// ============================================================
loadMessages();
