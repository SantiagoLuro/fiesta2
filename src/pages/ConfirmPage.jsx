import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  CheckCircle,
  XCircle,
  Users,
  Utensils,
  Check,
} from 'lucide-react';

// =================== CONFIG ===================
// URL del Google Apps Script para guardar las respuestas en Sheets.  
// Sustitúyelo por tu propia URL cuando despliegues el script.
const WEB_APP_URL =
  'https://script.google.com/macros/s/tu-deployment-id/exec';
// Clave secreta compartida con tu Apps Script para evitar envíos no autorizados.
const SHARED_SECRET = 'camila-tomas-boda-secret';
// ==============================================

/**
 * Componente Snackbar: muestra mensajes de éxito o error en la parte inferior
 * de la pantalla. El estilo opaco y el contraste garantizan buena
 * legibilidad sobre el fondo oscuro.  
 */
const Snack = ({ open, kind = 'success', title, desc, onClose, duration = 4500 }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open) return null;

  const base =
    'pointer-events-auto max-w-[560px] w-[calc(100%-2rem)] md:w-auto rounded-xl px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)]';
  const style = {
    backgroundColor: '#000',
    color: '#fff',
    border: kind === 'error'
      ? '1px solid rgba(255, 77, 77, 0.6)'
      : '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 flex justify-center z-[999] isolate pointer-events-none"
      style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      role="status"
      aria-live="polite"
    >
      <div className={base} style={style}>
        <p className="font-semibold leading-tight">{title}</p>
        {desc ? (
          <p className="text-sm opacity-90 leading-snug break-words">{desc}</p>
        ) : null}
        <button
          onClick={onClose}
          className="mt-1 text-sm opacity-80 hover:opacity-100 underline underline-offset-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

/**
 * Página de confirmación de asistencia.
 * Contiene un formulario para recoger el nombre de los invitados, su asistencia,
 * miembros adicionales y restricciones alimentarias. Envía la información al
 * Apps Script configurado en WEB_APP_URL.  
 */
const ConfirmPage = () => {
  const [asistencia, setAsistencia] = useState('');
  const [nombre, setNombre] = useState('');
  const [familiares, setFamiliares] = useState('');
  const [restricciones, setRestricciones] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Estado para snackbar
  const [snack, setSnack] = useState({ open: false, kind: 'success', title: '', desc: '' });
  const showSnack = (kind, title, desc) => setSnack({ open: true, kind, title, desc });

  const resetForm = () => {
    setAsistencia('');
    setNombre('');
    setFamiliares('');
    setRestricciones('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!asistencia || !nombre.trim()) return;

    setEnviando(true);

    const payload = {
      secret: SHARED_SECRET,
      type: 'rsvp',
      nombre: nombre.trim(),
      asistencia: asistencia === 'si' ? 'Sí' : 'No',
      familiares: asistencia === 'si' ? familiares || '' : '',
      restricciones: asistencia === 'si' ? restricciones || '' : '',
    };

    let ok = true;
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Error enviando RSVP:', err);
      ok = false;
    }

    setEnviando(false);

    if (ok) {
      showSnack(
        'success',
        '¡Confirmación recibida!',
        `Gracias ${payload.nombre}. ${
          payload.asistencia === 'Sí'
            ? '¡Te esperamos para celebrar! 🎉'
            : 'Lamentamos que no puedas venir 💛'
        }`,
      );
      resetForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSnack('error', 'Hubo un problema', 'Intentá nuevamente más tarde.');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen flex items-center justify-center bg-black/60 p-4"
      >
        {/* Botón de regreso al inicio */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-30"
        >
          <ArrowLeft size={24} />
        </Link>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-50 w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 playfair mb-2">
              Confirmación de Asistencia
            </h1>
            <p className="text-gray-500">Ingresá tus datos y confirmá tu presencia en la boda.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            onKeyDownCapture={(e) => e.stopPropagation()}
            className="space-y-6"
          >
            {/* Campo de nombre */}
            <div>
              <label htmlFor="nombre" className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                <User size={18} className="text-[#bfa977]" />
                Nombre y Apellido
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="off"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bfa977]/50 transition text-gray-900 placeholder:text-gray-400 caret-[#bfa977] bg-white"
              />
            </div>

            {/* Selección de asistencia */}
            <div>
              <span className="font-semibold text-gray-700 mb-3 block">Asistencia</span>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Opción Sí */}
                <motion.label
                  htmlFor="asiste-si"
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                    asistencia === 'si'
                      ? 'bg-[#f7f7f5] border-[#bfa977] ring-2 ring-[#bfa977]/50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    id="asiste-si"
                    type="radio"
                    name="asistencia"
                    value="si"
                    required
                    checked={asistencia === 'si'}
                    onChange={(e) => setAsistencia(e.target.value)}
                    className="hidden"
                  />
                  <CheckCircle
                    size={20}
                    className={asistencia === 'si' ? 'text-[#bfa977]' : 'text-gray-400'}
                  />
                  <span
                    className={
                      asistencia === 'si'
                        ? 'text-[#bfa977] font-semibold'
                        : 'text-gray-700'
                    }
                  >
                    Sí, confirmo
                  </span>
                </motion.label>

                {/* Opción No */}
                <motion.label
                  htmlFor="asiste-no"
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                    asistencia === 'no'
                      ? 'bg-[#f7f7f5] border-gray-400 ring-2 ring-gray-300'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    id="asiste-no"
                    type="radio"
                    name="asistencia"
                    value="no"
                    required
                    checked={asistencia === 'no'}
                    onChange={(e) => setAsistencia(e.target.value)}
                    className="hidden"
                  />
                  <XCircle
                    size={20}
                    className={asistencia === 'no' ? 'text-gray-500' : 'text-gray-400'}
                  />
                  <span
                    className={
                      asistencia === 'no'
                        ? 'text-gray-700 font-semibold'
                        : 'text-gray-700'
                    }
                  >
                    No podré asistir
                  </span>
                </motion.label>
              </div>
            </div>

            {/* Campos condicionales para invitados que confirman asistencia */}
            {asistencia === 'si' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="familiares"
                    className="font-semibold text-gray-700 flex items-center gap-2 mb-2"
                  >
                    <Users size={18} className="text-[#bfa977]" />
                    ¿Asistís con tu grupo familiar?
                  </label>
                  <textarea
                    id="familiares"
                    name="familiares"
                    rows="2"
                    value={familiares}
                    onChange={(e) => setFamiliares(e.target.value)}
                    placeholder="Indicar cantidad y nombres (si corresponde)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bfa977]/50 transition text-gray-900 placeholder:text-gray-400 caret-[#bfa977] bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="restricciones"
                    className="font-semibold text-gray-700 flex items-center gap-2 mb-2"
                  >
                    <Utensils size={18} className="text-[#bfa977]" />
                    ¿Tenés alguna restricción alimenticia?
                  </label>
                  <textarea
                    id="restricciones"
                    name="restricciones"
                    rows="2"
                    value={restricciones}
                    onChange={(e) => setRestricciones(e.target.value)}
                    placeholder="Vegano/a, celíaco/a, otra..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bfa977]/50 transition text-gray-900 placeholder:text-gray-400 caret-[#bfa977] bg-white"
                  />
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={enviando}
              className="w-full bg-gradient-to-r from-[#2c3e50] to-[#bfa977] text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {enviando ? 'Enviando…' : 'Enviar Confirmación'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Snackbar que se muestra al enviar el formulario */}
      <Snack
        open={snack.open}
        kind={snack.kind}
        title={snack.title}
        desc={snack.desc}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default ConfirmPage;