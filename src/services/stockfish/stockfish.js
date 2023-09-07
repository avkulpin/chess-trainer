import {
  CURRMOVENUMBER,
  FOUND_BEST_MOVE,
  INFO,
} from '../../hooks/useStockfish';
import { formatMoveString, parseVariationMessage } from '../../utils/stockfish';

class StockfishEngine {
  constructor({ depth = 17, level = 20, multiPv = 3 } = {}) {
    this.engine = null;
    this.depth = depth;
    this.level = level;
    this.multiVp = multiPv;
    this._hashSize = 256;
    this._threads = 8;
    this._isLocked = false;
    this._variations = [];
    this._callback = null;
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
    this.engine.addMessageListener(this.handleNewMessage.bind(this));

    return true;
  }

  evaluate(moves, callback) {
    if (this._lockEvaluation(true)) {
      return;
    }

    this._callback = callback;
    const moveString = formatMoveString(moves);
    this.engine.postMessage(`position startpos moves ${moveString}`);
    this.engine.postMessage(`go depth ${this.depth}`);
  }

  handleNewMessage(message) {
    if (FOUND_BEST_MOVE.test(message)) {
      const [, from, to, promotion] = message.match(FOUND_BEST_MOVE);

      this._callback({
        bestMove: { from, to, promotion },
        variations: this._variations,
      });
      this._lockEvaluation(false);
      this._variations = [];
    } else if (INFO.test(message) && !CURRMOVENUMBER.test(message)) {
      const info = parseVariationMessage(message);

      if (info.depth === this.depth) {
        this._variations.push(info);
      }
    }
  }

  setOption(name, value) {
    this.engine.postMessage(`setoption name ${name} value ${value}`);
  }

  destroy() {
    this.engine.postMessage('quit');
  }

  _lockEvaluation(isLocked) {
    if (this._isLocked && isLocked) {
      return false;
    }

    this._isLocked = isLocked;
  }
}

export const stockfishEngine = new StockfishEngine();
