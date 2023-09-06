import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { formatMoveString, parseVariationMessage } from '../utils/stockfish';
import { FOUND_BEST_MOVE, VARIATION_INFO } from './useStockfish';

export const useEngine = () => {
  const evaluationRef = useRef(null);
  const [evaluation, setEvaluation] = useState(null);
  const [bestMove, setBestMove] = useState(null);

  const { data: engine } = useQuery(['engine'], () => Stockfish(), {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess(engine) {
      engine.addMessageListener(handleNewMessage);
      engine.postMessage('uci');
      engine.postMessage('setoption name MultiPV value 1');
      engine.postMessage('isready');
      engine.postMessage('ucinewgame');
    },
  });

  useEffect(
    () => () => {
      engine?.removeMessageListener?.(handleNewMessage);
      engine?.postMessage?.('quit');
    },
    [],
  );

  const handleNewMessage = (message) => {
    if (FOUND_BEST_MOVE.test(message)) {
      const [, from, to, promotion] = message.match(FOUND_BEST_MOVE);
      setBestMove({ from, to, promotion });
      setEvaluation(evaluationRef.current);
      console.log('1231231');
      evaluationRef.current = null;
      setTimeout(() => engine?.postMessage('eval'), 500);
    } else if (VARIATION_INFO.test(message)) {
      evaluationRef.current = parseVariationMessage(message);
    }
  };

  return {
    bestMove,
    evaluation,
    findBestMove(moves) {
      const moveString = formatMoveString(moves);
      engine.postMessage(`position startpos moves ${moveString}`);
      engine.postMessage(`go depth 15`);
    },
  };
};
