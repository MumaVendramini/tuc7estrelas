import { Workbox } from 'workbox-window';

// Função para registrar o service worker
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');

    // Adicionar evento para atualização disponível
    wb.addEventListener('waiting', (event) => {
      if (window.confirm('Nova versão disponível! Clique em OK para atualizar.')) {
        wb.messageSkipWaiting();
      }
    });

    // Adicionar evento para controle de atualização
    wb.addEventListener('controlling', (event) => {
      window.location.reload();
    });

    // Registrar o service worker
    wb.register()
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  } else {
    console.log('Service Worker não é suportado neste navegador.');
  }
}

// Função para verificar se o app pode ser instalado
export function checkInstallable(setInstallPrompt) {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir o comportamento padrão
    e.preventDefault();
    // Armazenar o evento para uso posterior
    setInstallPrompt(e);
  });
}

// Função para instalar o app
export function installApp(installPrompt, setInstallPrompt) {
  if (!installPrompt) return;

  // Mostrar o prompt de instalação
  installPrompt.prompt();

  // Aguardar a escolha do usuário
  installPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('Usuário aceitou a instalação do PWA');
    } else {
      console.log('Usuário recusou a instalação do PWA');
    }
    // Limpar o prompt
    setInstallPrompt(null);
  });
}
