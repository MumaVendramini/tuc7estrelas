import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Tenda de Umbanda Caboclo 7 Estrelas</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Placeholder para os ícones do dashboard */}
        <div className="bg-green-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
            <span>C</span>
          </div>
          <span>Calendário</span>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
            <span>E</span>
          </div>
          <span>Entidades</span>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
            <span>Es</span>
          </div>
          <span>Estudos</span>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
            <span>F</span>
          </div>
          <span>Fotos</span>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
            <span>P</span>
          </div>
          <span>Pontos</span>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
            <span>A</span>
          </div>
          <span>Aniversários</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
