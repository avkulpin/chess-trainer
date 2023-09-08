import {
  CURRMOVENUMBER,
  FOUND_BEST_MOVE,
  INFO,
} from '../../hooks/useStockfish';
import { formatMoveString, parseVariationMessage } from '../../utils/stockfish';

class StockfishEngine {
  constructor({ depth = 18, level = 20, multiPv = 1 } = {}) {
    this.engine = null;
    this.depth = depth;
    this.level = level;
    this.multiVp = multiPv;
    this._minDepth = 6;
    this._hashSize = 256;
    this._threads = 8;
    this._isRunning = false;
    this._evaluations = {};
    this._curWork = null;
  }

  async init() {
    this.engine = await Stockfish();
    this.engine.postMessage('uci');
    this.engine.postMessage(`setoption name Hash value ${this._hashSize}`);
    this.engine.postMessage(`setoption name Threads value ${this._threads}`);
    this.engine.postMessage(`setoption name MultiPV value ${this.multiVp}`);
    this.engine.postMessage(`setoption name Skill Level value ${this.level}`);
    this.engine.postMessage('isready');
    this.engine.postMessage('ucinewgame');
    this.engine.addMessageListener(() => {});
    this.engine.addMessageListener(this.handleNewMessage.bind(this));

    return true;
  }

  evaluate(work, callback) {
    const result = this._evaluations[work.fen];

    if (result && result.isFinalized) {
      return void callback({
        ...result,
      });
    }

    if (this._isRunning && this._curWork.fen !== work.fen) {
      this.engine.postMessage('stop');
    }

    this._curWork = {
      ...work,
      callback,
    };
    const moveString = formatMoveString(this._curWork.moves);
    this.engine.postMessage(
      `position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 moves ${moveString}`,
    );
    this.engine.postMessage(`go depth ${this.depth}`);
  }

  handleNewMessage(message) {
    if (FOUND_BEST_MOVE.test(message)) {
      const [, from, to, promotion] = message.match(FOUND_BEST_MOVE);
      const bestMove = { from, to, promotion };

      this._evaluations[this._curWork.fen] = {
        ...this._evaluations[this._curWork.fen],
        bestMove,
        isFinalized: true,
      };

      this._curWork.callback({
        bestMove,
        work: this._curWork,
      });
      this._isRunning = false;
    } else if (INFO.test(message) && !CURRMOVENUMBER.test(message)) {
      const parsedEvaluation = parseVariationMessage(message);

      if (parsedEvaluation.depth >= this._minDepth) {
        this._evaluations[this._curWork.fen] = {
          ...parsedEvaluation,
          isFinalized: false,
          work: this._curWork,
        };

        this._curWork.callback({
          evaluation: parsedEvaluation,
          work: this._curWork,
        });
      }
    }
  }

  setOption(name, value) {
    this.engine.postMessage(`setoption name ${name} value ${value}`);
  }

  destroy() {
    this.engine.postMessage('quit');
  }

  _initiateWork(isRunning) {
    if (this._isRunning) {
      return false;
    }

    this._isRunning = isRunning;
  }
}

export const stockfishEngine = new StockfishEngine();
