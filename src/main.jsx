import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HomePage } from './home.jsx';

hydrateRoot(document.getElementById('conteudo'), <HomePage />);
