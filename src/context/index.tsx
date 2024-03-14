import React from 'react';
import PropTypes from 'prop-types';
import PokemonContextProvider from './PokemonContext';
import TansatckContextProvider from './TanstackContext';

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <TansatckContextProvider>
      <PokemonContextProvider>{children}</PokemonContextProvider>
    </TansatckContextProvider>
  );
}

ContextProvider.defaultProps = {
  children: null,
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
