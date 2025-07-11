'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

interface ScheduleStatus {
  currentTime: string;
  lastRun: string | null;
  nextRun: string;
  isTimeToRun: boolean;
  totalScheduledTopics: number;
}

const AdminPage: React.FC = () => {
  const [scheduleStatus, setScheduleStatus] = useState<ScheduleStatus | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    fetchScheduleStatus();
    const interval = setInterval(fetchScheduleStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchScheduleStatus = async () => {
    try {
      const response = await fetch('/api/auto-content');
      const data = await response.json();
      setScheduleStatus(data);
    } catch (error) {
      console.error('Error fetching schedule status:', error);
    }
  };

  const generateContentManually = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/auto-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const result = await response.json();
      
      if (result.success) {
        setLogs(prev => [...prev, `✅ ${new Date().toLocaleString()}: Contenido generado - ${result.post.title}`]);
        fetchScheduleStatus(); // Refresh status
      } else {
        setLogs(prev => [...prev, `❌ ${new Date().toLocaleString()}: Error - ${result.error}`]);
      }
    } catch (error) {
      setLogs(prev => [...prev, `❌ ${new Date().toLocaleString()}: Error de conexión`]);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🤖 Admin Dashboard - Auto Content</h1>
      
      <div className={styles.grid}>
        {/* Status Card */}
        <div className={styles.card}>
          <h2>📊 Estado del Scheduler</h2>
          {scheduleStatus ? (
            <div className={styles.statusGrid}>
              <div className={styles.statusItem}>
                <span className={styles.label}>Hora actual:</span>
                <span className={styles.value}>{new Date(scheduleStatus.currentTime).toLocaleString()}</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.label}>Última ejecución:</span>
                <span className={styles.value}>
                  {scheduleStatus.lastRun ? new Date(scheduleStatus.lastRun).toLocaleString() : 'Nunca'}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.label}>Próxima ejecución:</span>
                <span className={styles.value}>{new Date(scheduleStatus.nextRun).toLocaleString()}</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.label}>¿Listo para ejecutar?</span>
                <span className={`${styles.value} ${scheduleStatus.isTimeToRun ? styles.ready : styles.notReady}`}>
                  {scheduleStatus.isTimeToRun ? '✅ Sí' : '⏳ No'}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.label}>Topics programados:</span>
                <span className={styles.value}>{scheduleStatus.totalScheduledTopics}</span>
              </div>
            </div>
          ) : (
            <p>Cargando estado...</p>
          )}
        </div>

        {/* Manual Controls */}
        <div className={styles.card}>
          <h2>🎮 Controles Manuales</h2>
          <div className={styles.controls}>
            <button 
              onClick={generateContentManually}
              disabled={isGenerating}
              className={`${styles.button} ${styles.generateButton}`}
            >
              {isGenerating ? '⏳ Generando...' : '🚀 Generar Contenido Ahora'}
            </button>
            <button 
              onClick={fetchScheduleStatus}
              className={`${styles.button} ${styles.refreshButton}`}
            >
              🔄 Actualizar Estado
            </button>
          </div>
          <div className={styles.info}>
            <p>💡 <strong>Tip:</strong> El contenido se genera automáticamente todos los días a las 9:00 AM</p>
            <p>🔧 <strong>Manual:</strong> Usa el botón para generar contenido inmediatamente</p>
          </div>
        </div>

        {/* Logs */}
        <div className={styles.card}>
          <div className={styles.logsHeader}>
            <h2>📝 Logs de Actividad</h2>
            <button 
              onClick={clearLogs}
              className={`${styles.button} ${styles.clearButton}`}
            >
              🗑️ Limpiar
            </button>
          </div>
          <div className={styles.logs}>
            {logs.length === 0 ? (
              <p className={styles.noLogs}>No hay logs disponibles</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={styles.logEntry}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className={styles.card}>
          <h2>📈 Estadísticas</h2>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Contenido generado</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Disponibilidad</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Categorías</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
