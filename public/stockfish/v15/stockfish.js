/*!
 * Stockfish copyright T. Romstad, M. Costalba, J. Kiiski, G. Linscott
 * and other contributors.
 *
 * Released under the GNU General Public License v3.
 *
 * Compiled to JavaScript and WebAssembly by Niklas Fiekas
 * <niklas.fiekas@backscattering.de> using Emscripten.
 *
 * https://github.com/lichess-org/stockfish.wasm
 */

var Stockfish = (function () {
  var _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return function (Stockfish) {
    Stockfish = Stockfish || {};

    function d() {
      k.buffer != l && n(k.buffer);
      return aa;
    }
    function u() {
      k.buffer != l && n(k.buffer);
      return ba;
    }
    function v() {
      k.buffer != l && n(k.buffer);
      return ca;
    }
    function w() {
      k.buffer != l && n(k.buffer);
      return da;
    }
    function ea() {
      k.buffer != l && n(k.buffer);
      return ha;
    }
    null;
    var z;
    z || (z = typeof Stockfish !== 'undefined' ? Stockfish : {});
    var ia, ja;
    z.ready = new Promise(function (a, b) {
      ia = a;
      ja = b;
    });
    (function () {
      function a() {
        var g = e.shift();
        if (!b && void 0 !== g) {
          if ('quit' === g) return z.terminate();
          var m = z.ccall('uci_command', 'number', ['string'], [g]);
          m && e.unshift(g);
          h = m ? 2 * h : 1;
          setTimeout(a, h);
        }
      }
      var b = !1,
        c = [];
      z.print = function (g) {
        0 === c.length
          ? console.log(g)
          : setTimeout(function () {
              for (var m = 0; m < c.length; m++) c[m](g);
            });
      };
      z.addMessageListener = function (g) {
        c.push(g);
      };
      z.removeMessageListener = function (g) {
        g = c.indexOf(g);
        0 <= g && c.splice(g, 1);
      };
      z.terminate = function () {
        b = !0;
        A.Ca();
      };
      var e = [],
        h = 1;
      z.postMessage = function (g) {
        e.push(g);
      };
      z.postRun = function () {
        z.postMessage = function (g) {
          e.push(g);
          1 === e.length && a();
        };
        a();
      };
    })();
    var B = {},
      C;
    for (C in z) z.hasOwnProperty(C) && (B[C] = z[C]);
    var ka = [],
      la = './this.program';
    function ma(a, b) {
      throw b;
    }
    var na = 'object' === typeof window,
      D = 'function' === typeof importScripts,
      E =
        'object' === typeof process &&
        'object' === typeof process.versions &&
        'string' === typeof process.versions.node,
      F = z.ENVIRONMENT_IS_PTHREAD || !1,
      G = '';
    function oa(a) {
      return z.locateFile ? z.locateFile(a, G) : G + a;
    }
    var H, I, J, K;
    if (E) {
      G = D ? require('path').dirname(G) + '/' : __dirname + '/';
      H = function (a, b) {
        J || (J = require('fs'));
        K || (K = require('path'));
        a = K.normalize(a);
        return J.readFileSync(a, b ? null : 'utf8');
      };
      I = function (a) {
        a = H(a, !0);
        a.buffer || (a = new Uint8Array(a));
        assert(a.buffer);
        return a;
      };
      1 < process.argv.length && (la = process.argv[1].replace(/\\/g, '/'));
      ka = process.argv.slice(2);
      process.on('uncaughtException', function (a) {
        if (!(a instanceof L)) throw a;
      });
      process.on('unhandledRejection', M);
      ma = function (a, b) {
        if (N()) throw ((process.exitCode = a), b);
        process.exit(a);
      };
      z.inspect = function () {
        return '[Emscripten Module object]';
      };
      var pa;
      try {
        pa = require('worker_threads');
      } catch (a) {
        throw (
          (console.error(
            'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?',
          ),
          a)
        );
      }
      global.Worker = pa.Worker;
    } else if (na || D)
      D
        ? (G = self.location.href)
        : 'undefined' !== typeof document &&
          document.currentScript &&
          (G = document.currentScript.src),
        _scriptDir && (G = _scriptDir),
        0 !== G.indexOf('blob:')
          ? (G = G.substr(0, G.lastIndexOf('/') + 1))
          : (G = ''),
        E
          ? ((H = function (a, b) {
              J || (J = require('fs'));
              K || (K = require('path'));
              a = K.normalize(a);
              return J.readFileSync(a, b ? null : 'utf8');
            }),
            (I = function (a) {
              a = H(a, !0);
              a.buffer || (a = new Uint8Array(a));
              assert(a.buffer);
              return a;
            }))
          : ((H = function (a) {
              var b = new XMLHttpRequest();
              b.open('GET', a, !1);
              b.send(null);
              return b.responseText;
            }),
            D &&
              (I = function (a) {
                var b = new XMLHttpRequest();
                b.open('GET', a, !1);
                b.responseType = 'arraybuffer';
                b.send(null);
                return new Uint8Array(b.response);
              }));
    E &&
      'undefined' === typeof performance &&
      (global.performance = require('perf_hooks').performance);
    var qa = z.print || console.log.bind(console),
      P = z.printErr || console.warn.bind(console);
    for (C in B) B.hasOwnProperty(C) && (z[C] = B[C]);
    B = null;
    z.arguments && (ka = z.arguments);
    z.thisProgram && (la = z.thisProgram);
    z.quit && (ma = z.quit);
    var ra, sa;
    z.wasmBinary && (sa = z.wasmBinary);
    var noExitRuntime = z.noExitRuntime || !0;
    'object' !== typeof WebAssembly && M('no native wasm support detected');
    var k,
      ua,
      va = !1,
      Q;
    function assert(a, b) {
      a || M('Assertion failed: ' + b);
    }
    function wa(a) {
      var b = z['_' + a];
      assert(
        b,
        'Cannot call unknown function ' + a + ', make sure it is exported',
      );
      return b;
    }
    function xa(a) {
      var b = new TextDecoder(a);
      this.decode = function (c) {
        c.buffer instanceof SharedArrayBuffer && (c = new Uint8Array(c));
        return b.decode.call(b, c);
      };
    }
    var ya = 'undefined' !== typeof TextDecoder ? new xa('utf8') : void 0;
    function za(a, b, c) {
      var e = b + c;
      for (c = b; a[c] && !(c >= e); ) ++c;
      if (16 < c - b && a.subarray && ya) return ya.decode(a.subarray(b, c));
      for (e = ''; b < c; ) {
        var h = a[b++];
        if (h & 128) {
          var g = a[b++] & 63;
          if (192 == (h & 224)) e += String.fromCharCode(((h & 31) << 6) | g);
          else {
            var m = a[b++] & 63;
            h =
              224 == (h & 240)
                ? ((h & 15) << 12) | (g << 6) | m
                : ((h & 7) << 18) | (g << 12) | (m << 6) | (a[b++] & 63);
            65536 > h
              ? (e += String.fromCharCode(h))
              : ((h -= 65536),
                (e += String.fromCharCode(
                  55296 | (h >> 10),
                  56320 | (h & 1023),
                )));
          }
        } else e += String.fromCharCode(h);
      }
      return e;
    }
    function R(a) {
      return a ? za(u(), a, void 0) : '';
    }
    function Aa(a, b, c, e) {
      if (0 < e) {
        e = c + e - 1;
        for (var h = 0; h < a.length; ++h) {
          var g = a.charCodeAt(h);
          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++h);
            g = (65536 + ((g & 1023) << 10)) | (m & 1023);
          }
          if (127 >= g) {
            if (c >= e) break;
            b[c++] = g;
          } else {
            if (2047 >= g) {
              if (c + 1 >= e) break;
              b[c++] = 192 | (g >> 6);
            } else {
              if (65535 >= g) {
                if (c + 2 >= e) break;
                b[c++] = 224 | (g >> 12);
              } else {
                if (c + 3 >= e) break;
                b[c++] = 240 | (g >> 18);
                b[c++] = 128 | ((g >> 12) & 63);
              }
              b[c++] = 128 | ((g >> 6) & 63);
            }
            b[c++] = 128 | (g & 63);
          }
        }
        b[c] = 0;
      }
    }
    function Ba(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var e = a.charCodeAt(c);
        55296 <= e &&
          57343 >= e &&
          (e = (65536 + ((e & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= e ? ++b : (b = 2047 >= e ? b + 2 : 65535 >= e ? b + 3 : b + 4);
      }
      return b;
    }
    'undefined' !== typeof TextDecoder && new xa('utf-16le');
    function Ca(a) {
      var b = Ba(a) + 1,
        c = S(b);
      Aa(a, d(), c, b);
      return c;
    }
    function Da(a, b) {
      d().set(a, b);
    }
    var l, aa, ba, ca, da, ha;
    F && (l = z.buffer);
    function n(a) {
      l = a;
      z.HEAP8 = aa = new Int8Array(a);
      z.HEAP16 = new Int16Array(a);
      z.HEAP32 = ca = new Int32Array(a);
      z.HEAPU8 = ba = new Uint8Array(a);
      z.HEAPU16 = new Uint16Array(a);
      z.HEAPU32 = da = new Uint32Array(a);
      z.HEAPF32 = new Float32Array(a);
      z.HEAPF64 = ha = new Float64Array(a);
    }
    var Ea = z.INITIAL_MEMORY || 71303168;
    if (F) (k = z.wasmMemory), (l = z.buffer);
    else if (z.wasmMemory) k = z.wasmMemory;
    else if (
      ((k = new WebAssembly.Memory({
        initial: Ea / 65536,
        maximum: 32768,
        shared: !0,
      })),
      !(k.buffer instanceof SharedArrayBuffer))
    )
      throw (
        (P(
          'requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag',
        ),
        E &&
          console.log(
            '(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)',
          ),
        Error('bad memory'))
      );
    k && (l = k.buffer);
    Ea = l.byteLength;
    n(l);
    var T,
      Fa = [],
      Ga = [],
      Ha = [],
      Ia = [],
      Ja = 0;
    function N() {
      return noExitRuntime || 0 < Ja;
    }
    function Ka() {
      var a = z.preRun.shift();
      Fa.unshift(a);
    }
    var U = 0,
      La = null,
      Ma = null;
    z.preloadedImages = {};
    z.preloadedAudios = {};
    function M(a) {
      if (z.onAbort) z.onAbort(a);
      assert(!F);
      P(a);
      va = !0;
      Q = 1;
      a = new WebAssembly.RuntimeError(
        'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.',
      );
      ja(a);
      throw a;
    }
    function Na() {
      return V.startsWith('data:application/octet-stream;base64,');
    }
    var V;
    V = 'stockfish.wasm';
    Na() || (V = oa(V));
    function Oa() {
      var a = V;
      try {
        if (a == V && sa) return new Uint8Array(sa);
        if (I) return I(a);
        throw 'both async and sync fetching of the wasm failed';
      } catch (b) {
        M(b);
      }
    }
    function Pa() {
      return sa || (!na && !D) || 'function' !== typeof fetch
        ? Promise.resolve().then(function () {
            return Oa();
          })
        : fetch(V, { credentials: 'same-origin' })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + V + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Oa();
            });
    }
    var Qa = {
      25528: function () {
        throw 'Canceled!';
      },
    };
    function Ra(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ('function' == typeof b) b(z);
        else {
          var c = b.lb;
          'number' === typeof c
            ? void 0 === b.pa
              ? T.get(c)()
              : T.get(c)(b.pa)
            : c(void 0 === b.pa ? null : b.pa);
        }
      }
    }
    function Sa(a, b) {
      if (0 >= a || a > d().length || a & 1 || 0 > b) return -28;
      if (0 == b) return 0;
      2147483647 <= b && (b = Infinity);
      var c = Atomics.load(v(), W >> 2),
        e = 0;
      if (
        c == a &&
        Atomics.compareExchange(v(), W >> 2, c, 0) == c &&
        (--b, (e = 1), 0 >= b)
      )
        return 1;
      a = Atomics.notify(v(), a >> 2, b);
      if (0 <= a) return a + e;
      throw 'Atomics.notify returned an unexpected value ' + a;
    }
    z._emscripten_futex_wake = Sa;
    function Ta(a) {
      if (F)
        throw 'Internal Error! cleanupThread() can only ever be called from main application thread!';
      if (!a) throw 'Internal Error! Null pthread_ptr in cleanupThread!';
      var b = A.ia[a];
      b && ((v()[(a + 12) >> 2] = 0), A.wa(b.worker));
    }
    var A = {
      ka: [],
      la: [],
      Ea: [],
      Ra: function () {
        for (var a = 0; 1 > a; ++a) A.Fa();
      },
      Sa: function () {
        for (var a = X(228), b = 0; 57 > b; ++b) w()[a / 4 + b] = 0;
        v()[(a + 12) >> 2] = a;
        b = a + 152;
        v()[b >> 2] = b;
        var c = X(512);
        for (b = 0; 128 > b; ++b) w()[c / 4 + b] = 0;
        Atomics.store(w(), (a + 100) >> 2, c);
        Atomics.store(w(), (a + 40) >> 2, a);
        Ua(a, !D, 1);
        Va(a);
      },
      Ta: function () {
        A.receiveObjectTransfer = A.Va;
        A.threadInit = A.$a;
        A.threadCancel = A.Za;
        A.threadExit = A.Ma;
        A.setExitStatus = A.Xa;
      },
      ia: {},
      Da: [],
      Ka: function () {
        for (; 0 < A.Da.length; ) A.Da.pop()();
        Wa();
      },
      La: function (a, b) {
        Atomics.store(w(), (a + 56) >> 2, 1);
        Atomics.store(w(), (a + 60) >> 2, 0);
        A.Ka();
        Atomics.store(w(), (a + 4) >> 2, b);
        Atomics.store(w(), (a + 0) >> 2, 1);
        Sa(a + 0, 2147483647);
        Ua(0, 0, 0);
      },
      Xa: function (a) {
        Q = a;
      },
      Ma: function (a) {
        var b = Y();
        b && (A.La(b, a), F && postMessage({ cmd: 'exit' }));
      },
      Za: function () {
        A.La(Y(), -1);
        postMessage({ cmd: 'cancelDone' });
      },
      Ca: function () {
        for (var a in A.ia) {
          var b = A.ia[a];
          b && b.worker && A.wa(b.worker);
        }
        A.ia = {};
        for (a = 0; a < A.ka.length; ++a) {
          var c = A.ka[a];
          c.terminate();
        }
        A.ka = [];
        for (a = 0; a < A.la.length; ++a)
          (c = A.la[a]), (b = c.ha), A.Ba(b), c.terminate();
        A.la = [];
      },
      Ba: function (a) {
        if (a) {
          if (a.ja) {
            var b = v()[(a.ja + 100) >> 2];
            v()[(a.ja + 100) >> 2] = 0;
            Xa(b);
            Xa(a.ja);
          }
          a.ja = 0;
          a.Aa && a.ma && Xa(a.ma);
          a.ma = 0;
          a.worker && (a.worker.ha = null);
        }
      },
      wa: function (a) {
        A.Wa(function () {
          delete A.ia[a.ha.ja];
          A.ka.push(a);
          A.la.splice(A.la.indexOf(a), 1);
          A.Ba(a.ha);
          a.ha = void 0;
        });
      },
      Wa: function (a) {
        v()[Ya >> 2] = 0;
        try {
          a();
        } finally {
          v()[Ya >> 2] = 1;
        }
      },
      Va: function () {},
      $a: function () {
        for (var a in A.Ea) A.Ea[a]();
      },
      Ia: function (a, b) {
        a.onmessage = function (c) {
          var e = c.data,
            h = e.cmd;
          a.ha && (A.Na = a.ha.ja);
          if (e.targetThread && e.targetThread != Y()) {
            var g = A.ia[e.sb];
            g
              ? g.worker.postMessage(c.data, e.transferList)
              : P(
                  'Internal error! Worker sent a message "' +
                    h +
                    '" to target pthread ' +
                    e.targetThread +
                    ', but that thread no longer exists!',
                );
          } else if ('processQueuedMainThreadWork' === h) Za();
          else if ('spawnThread' === h) $a(c.data);
          else if ('cleanupThread' === h) Ta(e.thread);
          else if ('killThread' === h) {
            c = e.thread;
            if (F)
              throw 'Internal Error! killThread() can only ever be called from main application thread!';
            if (!c) throw 'Internal Error! Null pthread_ptr in killThread!';
            v()[(c + 12) >> 2] = 0;
            e = A.ia[c];
            delete A.ia[c];
            e.worker.terminate();
            A.Ba(e);
            A.la.splice(A.la.indexOf(e.worker), 1);
            e.worker.ha = void 0;
          } else if ('cancelThread' === h) {
            c = e.thread;
            if (F)
              throw 'Internal Error! cancelThread() can only ever be called from main application thread!';
            if (!c) throw 'Internal Error! Null pthread_ptr in cancelThread!';
            A.ia[c].worker.postMessage({ cmd: 'cancel' });
          } else if ('loaded' === h)
            (a.loaded = !0), b && b(a), a.qa && (a.qa(), delete a.qa);
          else if ('print' === h) qa('Thread ' + e.threadId + ': ' + e.text);
          else if ('printErr' === h) P('Thread ' + e.threadId + ': ' + e.text);
          else if ('alert' === h) alert('Thread ' + e.threadId + ': ' + e.text);
          else if ('exit' === h)
            a.ha && Atomics.load(w(), (a.ha.ja + 64) >> 2) && A.wa(a);
          else if ('exitProcess' === h)
            try {
              ab(e.returnCode);
            } catch (m) {
              if (m instanceof L) return;
              throw m;
            }
          else
            'cancelDone' === h
              ? A.wa(a)
              : 'objectTransfer' !== h &&
                ('setimmediate' === c.data.target
                  ? a.postMessage(c.data)
                  : P('worker sent an unknown command ' + h));
          A.Na = void 0;
        };
        a.onerror = function (c) {
          P(
            'pthread sent an error! ' +
              c.filename +
              ':' +
              c.lineno +
              ': ' +
              c.message,
          );
        };
        E &&
          (a.on('message', function (c) {
            a.onmessage({ data: c });
          }),
          a.on('error', function (c) {
            a.onerror(c);
          }),
          a.on('exit', function () {}));
        a.postMessage({
          cmd: 'load',
          urlOrBlob: z.mainScriptUrlOrBlob || _scriptDir,
          wasmMemory: k,
          wasmModule: ua,
        });
      },
      Fa: function () {
        var a = oa('stockfish.worker.js');
        A.ka.push(new Worker(a));
      },
      Pa: function () {
        0 == A.ka.length && (A.Fa(), A.Ia(A.ka[0]));
        return A.ka.pop();
      },
      gb: function (a) {
        for (a = performance.now() + a; performance.now() < a; );
      },
    };
    z.establishStackSpace = function (a, b) {
      bb(a, b);
      cb(a);
    };
    z.invokeEntryPoint = function (a, b) {
      return T.get(a)(b);
    };
    var db;
    db = E
      ? function () {
          var a = process.hrtime();
          return 1e3 * a[0] + a[1] / 1e6;
        }
      : F
      ? function () {
          return performance.now() - z.__performance_now_clock_drift;
        }
      : function () {
          return performance.now();
        };
    function $a(a) {
      if (F)
        throw 'Internal Error! spawnThread() can only ever be called from main application thread!';
      var b = A.Pa();
      if (!b) return 6;
      if (void 0 !== b.ha) throw 'Internal error!';
      if (!a.va) throw 'Internal error, no pthread ptr!';
      A.la.push(b);
      for (var c = X(512), e = 0; 128 > e; ++e) v()[(c + 4 * e) >> 2] = 0;
      var h = a.ma + a.na;
      e = A.ia[a.va] = { worker: b, ma: a.ma, na: a.na, Aa: a.Aa, ja: a.va };
      var g = e.ja >> 2;
      Atomics.store(w(), g + 16, a.detached);
      Atomics.store(w(), g + 25, c);
      Atomics.store(w(), g + 10, e.ja);
      Atomics.store(w(), g + 20, a.na);
      Atomics.store(w(), g + 19, h);
      Atomics.store(w(), g + 26, a.na);
      Atomics.store(w(), g + 28, h);
      Atomics.store(w(), g + 29, a.detached);
      c = eb() + 40;
      Atomics.store(w(), g + 43, c);
      b.ha = e;
      var m = {
        cmd: 'run',
        start_routine: a.Ya,
        arg: a.pa,
        threadInfoStruct: a.va,
        stackBase: a.ma,
        stackSize: a.na,
      };
      b.qa = function () {
        m.time = performance.now();
        b.postMessage(m, a.fb);
      };
      b.loaded && (b.qa(), delete b.qa);
      return 0;
    }
    function fb(a, b, c) {
      if (0 >= a || a > d().length || a & 1) return -28;
      if (na) {
        if (Atomics.load(v(), a >> 2) != b) return -6;
        var e = performance.now();
        c = e + c;
        for (Atomics.exchange(v(), W >> 2, a); ; ) {
          e = performance.now();
          if (e > c) return Atomics.exchange(v(), W >> 2, 0), -73;
          e = Atomics.exchange(v(), W >> 2, 0);
          if (0 == e) break;
          Za();
          if (Atomics.load(v(), a >> 2) != b) return -6;
          Atomics.exchange(v(), W >> 2, a);
        }
        return 0;
      }
      a = Atomics.wait(v(), a >> 2, b, c);
      if ('timed-out' === a) return -73;
      if ('not-equal' === a) return -6;
      if ('ok' === a) return 0;
      throw 'Atomics.wait returned an unexpected value ' + a;
    }
    function gb() {
      E ||
        D ||
        (ra || (ra = {}),
        ra[
          'Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread'
        ] ||
          ((ra[
            'Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread'
          ] = 1),
          P(
            'Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread',
          )));
    }
    function hb(a, b) {
      if (!a) return P('pthread_join attempted on a null thread pointer!'), 71;
      if (F && Y() == a)
        return P('PThread ' + a + ' is attempting to join to itself!'), 16;
      if (!F && ib() == a)
        return P('Main thread ' + a + ' is attempting to join to itself!'), 16;
      if (v()[(a + 12) >> 2] !== a)
        return (
          P(
            'pthread_join attempted on thread ' +
              a +
              ', which does not point to a valid thread, or does not exist anymore!',
          ),
          71
        );
      if (Atomics.load(w(), (a + 64) >> 2))
        return (
          P('Attempted to join thread ' + a + ', which was already detached!'),
          28
        );
      for (gb(); ; ) {
        var c = Atomics.load(w(), (a + 0) >> 2);
        if (1 == c)
          return (
            (c = Atomics.load(w(), (a + 4) >> 2)),
            b && (v()[b >> 2] = c),
            Atomics.store(w(), (a + 64) >> 2, 1),
            F ? postMessage({ cmd: 'cleanupThread', thread: a }) : Ta(a),
            0
          );
        jb();
        F || Za();
        fb(a + 0, c, F ? 100 : 1);
      }
    }
    var kb = [null, [], []],
      lb = {};
    function mb(a, b, c) {
      return F ? Z(2, 1, a, b, c) : 0;
    }
    function nb(a, b, c) {
      return F ? Z(3, 1, a, b, c) : 0;
    }
    function ob(a, b, c) {
      if (F) return Z(4, 1, a, b, c);
    }
    function pb() {
      if (F) return Z(5, 1);
      M();
    }
    var qb = [];
    function Z(a, b) {
      for (
        var c = arguments.length - 2, e = rb(), h = S(8 * c), g = h >> 3, m = 0;
        m < c;
        m++
      ) {
        var p = arguments[2 + m];
        ea()[g + m] = p;
      }
      c = sb(a, c, h, b);
      cb(e);
      return c;
    }
    var tb = [],
      ub = [
        0,
        'undefined' !== typeof document ? document : 0,
        'undefined' !== typeof window ? window : 0,
      ];
    function vb(a) {
      a = 2 < a ? R(a) : a;
      return (
        ub[a] ||
        ('undefined' !== typeof document ? document.querySelector(a) : void 0)
      );
    }
    function wb(a, b, c) {
      var e = vb(a);
      if (!e) return -4;
      e.ua && ((v()[e.ua >> 2] = b), (v()[(e.ua + 4) >> 2] = c));
      if (e.Ja || !e.ib)
        e.Ja && (e = e.Ja),
          (a = !1),
          e.ta &&
            e.ta.sa &&
            ((a = e.ta.sa.getParameter(2978)),
            (a =
              0 === a[0] &&
              0 === a[1] &&
              a[2] === e.width &&
              a[3] === e.height)),
          (e.width = b),
          (e.height = c),
          a && e.ta.sa.viewport(0, 0, b, c);
      else {
        if (e.ua) {
          e = v()[(e.ua + 8) >> 2];
          a = a ? R(a) : '';
          var h = rb(),
            g = S(12),
            m = 0;
          if (a) {
            m = Ba(a) + 1;
            var p = X(m);
            Aa(a, u(), p, m);
            m = p;
          }
          v()[g >> 2] = m;
          v()[(g + 4) >> 2] = b;
          v()[(g + 8) >> 2] = c;
          xb(0, e, 657457152, 0, m, g);
          cb(h);
          return 1;
        }
        return -4;
      }
      return 0;
    }
    function yb(a, b, c) {
      return F ? Z(6, 1, a, b, c) : wb(a, b, c);
    }
    function zb(a) {
      if (!va) {
        try {
          a();
        } catch (b) {
          if (b instanceof L) return;
          if ('unwind' !== b)
            throw (
              (b &&
                'object' === typeof b &&
                b.stack &&
                P('exception thrown: ' + [b, b.stack]),
              b)
            );
        }
        if (F && !N())
          try {
            F ? Ab(Q) : ab(Q);
          } catch (b) {
            if (!(b instanceof L)) throw b;
          }
      }
    }
    function Bb(a) {
      var b = a.getExtension('ANGLE_instanced_arrays');
      b &&
        ((a.vertexAttribDivisor = function (c, e) {
          b.vertexAttribDivisorANGLE(c, e);
        }),
        (a.drawArraysInstanced = function (c, e, h, g) {
          b.drawArraysInstancedANGLE(c, e, h, g);
        }),
        (a.drawElementsInstanced = function (c, e, h, g, m) {
          b.drawElementsInstancedANGLE(c, e, h, g, m);
        }));
    }
    function Cb(a) {
      var b = a.getExtension('OES_vertex_array_object');
      b &&
        ((a.createVertexArray = function () {
          return b.createVertexArrayOES();
        }),
        (a.deleteVertexArray = function (c) {
          b.deleteVertexArrayOES(c);
        }),
        (a.bindVertexArray = function (c) {
          b.bindVertexArrayOES(c);
        }),
        (a.isVertexArray = function (c) {
          return b.isVertexArrayOES(c);
        }));
    }
    function Db(a) {
      var b = a.getExtension('WEBGL_draw_buffers');
      b &&
        (a.drawBuffers = function (c, e) {
          b.drawBuffersWEBGL(c, e);
        });
    }
    function Eb(a, b) {
      a.Ha ||
        ((a.Ha = a.getContext),
        (a.getContext = function (e, h) {
          h = a.Ha(e, h);
          return ('webgl' == e) == h instanceof WebGLRenderingContext
            ? h
            : null;
        }));
      var c = a.getContext('webgl', b);
      return c ? Fb(c, b) : 0;
    }
    function Fb(a, b) {
      var c = X(8);
      v()[(c + 4) >> 2] = Y();
      var e = { nb: c, attributes: b, version: b.Ua, sa: a };
      a.canvas && (a.canvas.ta = e);
      ('undefined' === typeof b.Ga || b.Ga) && Gb(e);
      return c;
    }
    function Gb(a) {
      a || (a = Hb);
      if (!a.Qa) {
        a.Qa = !0;
        var b = a.sa;
        Bb(b);
        Cb(b);
        Db(b);
        b.jb = b.getExtension('EXT_disjoint_timer_query');
        b.pb = b.getExtension('WEBGL_multi_draw');
        (b.getSupportedExtensions() || []).forEach(function (c) {
          c.includes('lose_context') ||
            c.includes('debug') ||
            b.getExtension(c);
        });
      }
    }
    var Hb,
      Ib = ['default', 'low-power', 'high-performance'],
      Kb = {};
    function Lb() {
      if (!Mb) {
        var a = {
            USER: 'web_user',
            LOGNAME: 'web_user',
            PATH: '/',
            PWD: '/',
            HOME: '/home/web_user',
            LANG:
              (
                ('object' === typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                'C'
              ).replace('-', '_') + '.UTF-8',
            _: la || './this.program',
          },
          b;
        for (b in Kb) void 0 === Kb[b] ? delete a[b] : (a[b] = Kb[b]);
        var c = [];
        for (b in a) c.push(b + '=' + a[b]);
        Mb = c;
      }
      return Mb;
    }
    var Mb;
    function Nb(a, b) {
      if (F) return Z(7, 1, a, b);
      var c = 0;
      Lb().forEach(function (e, h) {
        var g = b + c;
        h = v()[(a + 4 * h) >> 2] = g;
        for (g = 0; g < e.length; ++g) d()[h++ >> 0] = e.charCodeAt(g);
        d()[h >> 0] = 0;
        c += e.length + 1;
      });
      return 0;
    }
    function Ob(a, b) {
      if (F) return Z(8, 1, a, b);
      var c = Lb();
      v()[a >> 2] = c.length;
      var e = 0;
      c.forEach(function (h) {
        e += h.length + 1;
      });
      v()[b >> 2] = e;
      return 0;
    }
    function Pb(a) {
      return F ? Z(9, 1, a) : 0;
    }
    function Qb(a, b, c, e) {
      if (F) return Z(10, 1, a, b, c, e);
      a = lb.mb(a);
      b = lb.kb(a, b, c);
      v()[e >> 2] = b;
      return 0;
    }
    function Rb(a, b, c, e, h) {
      if (F) return Z(11, 1, a, b, c, e, h);
    }
    function Sb(a, b, c, e) {
      if (F) return Z(12, 1, a, b, c, e);
      for (var h = 0, g = 0; g < c; g++) {
        for (
          var m = v()[(b + 8 * g) >> 2], p = v()[(b + (8 * g + 4)) >> 2], t = 0;
          t < p;
          t++
        ) {
          var r = u()[m + t],
            x = kb[a];
          0 === r || 10 === r
            ? ((1 === a ? qa : P)(za(x, 0)), (x.length = 0))
            : x.push(r);
        }
        h += p;
      }
      v()[e >> 2] = h;
      return 0;
    }
    function Tb(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function Ub(a, b) {
      for (var c = 0, e = 0; e <= b; c += a[e++]);
      return c;
    }
    var Vb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Wb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Xb(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          e = (Tb(a.getFullYear()) ? Vb : Wb)[c];
        if (b > e - a.getDate())
          (b -= e - a.getDate() + 1),
            a.setDate(1),
            11 > c
              ? a.setMonth(c + 1)
              : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
        else {
          a.setDate(a.getDate() + b);
          break;
        }
      }
      return a;
    }
    function Yb(a, b, c, e) {
      function h(f, q, y) {
        for (f = 'number' === typeof f ? f.toString() : f || ''; f.length < q; )
          f = y[0] + f;
        return f;
      }
      function g(f, q) {
        return h(f, q, '0');
      }
      function m(f, q) {
        function y(Jb) {
          return 0 > Jb ? -1 : 0 < Jb ? 1 : 0;
        }
        var O;
        0 === (O = y(f.getFullYear() - q.getFullYear())) &&
          0 === (O = y(f.getMonth() - q.getMonth())) &&
          (O = y(f.getDate() - q.getDate()));
        return O;
      }
      function p(f) {
        switch (f.getDay()) {
          case 0:
            return new Date(f.getFullYear() - 1, 11, 29);
          case 1:
            return f;
          case 2:
            return new Date(f.getFullYear(), 0, 3);
          case 3:
            return new Date(f.getFullYear(), 0, 2);
          case 4:
            return new Date(f.getFullYear(), 0, 1);
          case 5:
            return new Date(f.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(f.getFullYear() - 1, 11, 30);
        }
      }
      function t(f) {
        f = Xb(new Date(f.ga + 1900, 0, 1), f.za);
        var q = new Date(f.getFullYear() + 1, 0, 4),
          y = p(new Date(f.getFullYear(), 0, 4));
        q = p(q);
        return 0 >= m(y, f)
          ? 0 >= m(q, f)
            ? f.getFullYear() + 1
            : f.getFullYear()
          : f.getFullYear() - 1;
      }
      var r = v()[(e + 40) >> 2];
      e = {
        cb: v()[e >> 2],
        bb: v()[(e + 4) >> 2],
        xa: v()[(e + 8) >> 2],
        ra: v()[(e + 12) >> 2],
        oa: v()[(e + 16) >> 2],
        ga: v()[(e + 20) >> 2],
        ya: v()[(e + 24) >> 2],
        za: v()[(e + 28) >> 2],
        tb: v()[(e + 32) >> 2],
        ab: v()[(e + 36) >> 2],
        eb: r ? R(r) : '',
      };
      c = R(c);
      r = {
        '%c': '%a %b %d %H:%M:%S %Y',
        '%D': '%m/%d/%y',
        '%F': '%Y-%m-%d',
        '%h': '%b',
        '%r': '%I:%M:%S %p',
        '%R': '%H:%M',
        '%T': '%H:%M:%S',
        '%x': '%m/%d/%y',
        '%X': '%H:%M:%S',
        '%Ec': '%c',
        '%EC': '%C',
        '%Ex': '%m/%d/%y',
        '%EX': '%H:%M:%S',
        '%Ey': '%y',
        '%EY': '%Y',
        '%Od': '%d',
        '%Oe': '%e',
        '%OH': '%H',
        '%OI': '%I',
        '%Om': '%m',
        '%OM': '%M',
        '%OS': '%S',
        '%Ou': '%u',
        '%OU': '%U',
        '%OV': '%V',
        '%Ow': '%w',
        '%OW': '%W',
        '%Oy': '%y',
      };
      for (var x in r) c = c.replace(new RegExp(x, 'g'), r[x]);
      var fa = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(
          ' ',
        ),
        ta =
          'January February March April May June July August September October November December'.split(
            ' ',
          );
      r = {
        '%a': function (f) {
          return fa[f.ya].substring(0, 3);
        },
        '%A': function (f) {
          return fa[f.ya];
        },
        '%b': function (f) {
          return ta[f.oa].substring(0, 3);
        },
        '%B': function (f) {
          return ta[f.oa];
        },
        '%C': function (f) {
          return g(((f.ga + 1900) / 100) | 0, 2);
        },
        '%d': function (f) {
          return g(f.ra, 2);
        },
        '%e': function (f) {
          return h(f.ra, 2, ' ');
        },
        '%g': function (f) {
          return t(f).toString().substring(2);
        },
        '%G': function (f) {
          return t(f);
        },
        '%H': function (f) {
          return g(f.xa, 2);
        },
        '%I': function (f) {
          f = f.xa;
          0 == f ? (f = 12) : 12 < f && (f -= 12);
          return g(f, 2);
        },
        '%j': function (f) {
          return g(f.ra + Ub(Tb(f.ga + 1900) ? Vb : Wb, f.oa - 1), 3);
        },
        '%m': function (f) {
          return g(f.oa + 1, 2);
        },
        '%M': function (f) {
          return g(f.bb, 2);
        },
        '%n': function () {
          return '\n';
        },
        '%p': function (f) {
          return 0 <= f.xa && 12 > f.xa ? 'AM' : 'PM';
        },
        '%S': function (f) {
          return g(f.cb, 2);
        },
        '%t': function () {
          return '\t';
        },
        '%u': function (f) {
          return f.ya || 7;
        },
        '%U': function (f) {
          var q = new Date(f.ga + 1900, 0, 1),
            y = 0 === q.getDay() ? q : Xb(q, 7 - q.getDay());
          f = new Date(f.ga + 1900, f.oa, f.ra);
          return 0 > m(y, f)
            ? g(
                Math.ceil(
                  (31 -
                    y.getDate() +
                    (Ub(Tb(f.getFullYear()) ? Vb : Wb, f.getMonth() - 1) - 31) +
                    f.getDate()) /
                    7,
                ),
                2,
              )
            : 0 === m(y, q)
            ? '01'
            : '00';
        },
        '%V': function (f) {
          var q = new Date(f.ga + 1901, 0, 4),
            y = p(new Date(f.ga + 1900, 0, 4));
          q = p(q);
          var O = Xb(new Date(f.ga + 1900, 0, 1), f.za);
          return 0 > m(O, y)
            ? '53'
            : 0 >= m(q, O)
            ? '01'
            : g(
                Math.ceil(
                  (y.getFullYear() < f.ga + 1900
                    ? f.za + 32 - y.getDate()
                    : f.za + 1 - y.getDate()) / 7,
                ),
                2,
              );
        },
        '%w': function (f) {
          return f.ya;
        },
        '%W': function (f) {
          var q = new Date(f.ga, 0, 1),
            y =
              1 === q.getDay()
                ? q
                : Xb(q, 0 === q.getDay() ? 1 : 7 - q.getDay() + 1);
          f = new Date(f.ga + 1900, f.oa, f.ra);
          return 0 > m(y, f)
            ? g(
                Math.ceil(
                  (31 -
                    y.getDate() +
                    (Ub(Tb(f.getFullYear()) ? Vb : Wb, f.getMonth() - 1) - 31) +
                    f.getDate()) /
                    7,
                ),
                2,
              )
            : 0 === m(y, q)
            ? '01'
            : '00';
        },
        '%y': function (f) {
          return (f.ga + 1900).toString().substring(2);
        },
        '%Y': function (f) {
          return f.ga + 1900;
        },
        '%z': function (f) {
          f = f.ab;
          var q = 0 <= f;
          f = Math.abs(f) / 60;
          return (
            (q ? '+' : '-') +
            String('0000' + ((f / 60) * 100 + (f % 60))).slice(-4)
          );
        },
        '%Z': function (f) {
          return f.eb;
        },
        '%%': function () {
          return '%';
        },
      };
      for (x in r)
        c.includes(x) && (c = c.replace(new RegExp(x, 'g'), r[x](e)));
      x = Zb(c);
      if (x.length > b) return 0;
      Da(x, a);
      return x.length - 1;
    }
    F || A.Ra();
    var $b = [
      null,
      function (a, b) {
        if (F) return Z(1, 1, a, b);
      },
      mb,
      nb,
      ob,
      pb,
      yb,
      Nb,
      Ob,
      Pb,
      Qb,
      Rb,
      Sb,
    ];
    function Zb(a) {
      var b = Array(Ba(a) + 1);
      Aa(a, b, 0, b.length);
      return b;
    }
    var dc = {
      c: function (a, b, c, e) {
        M(
          'Assertion failed: ' +
            R(a) +
            ', at: ' +
            [b ? R(b) : 'unknown filename', c, e ? R(e) : 'unknown function'],
        );
      },
      y: function (a, b) {
        A.Da.push(function () {
          T.get(a)(b);
        });
      },
      F: function (a, b, c, e) {
        if ('undefined' === typeof SharedArrayBuffer)
          return (
            P(
              'Current environment does not support SharedArrayBuffer, pthreads are not available!',
            ),
            6
          );
        if (!a)
          return P('pthread_create called with a null thread pointer!'), 28;
        var h = [];
        if (F && 0 === h.length) return ac(687865856, a, b, c, e);
        var g = 0,
          m = 0;
        if (b && -1 != b) {
          var p = v()[b >> 2];
          p += 81920;
          g = v()[(b + 8) >> 2];
          m = 0 !== v()[(b + 12) >> 2];
        } else p = 2097152;
        (b = 0 == g) ? (g = bc(16, p)) : ((g -= p), assert(0 < g));
        for (var t = X(228), r = 0; 57 > r; ++r) w()[(t >> 2) + r] = 0;
        v()[a >> 2] = t;
        v()[(t + 12) >> 2] = t;
        a = t + 152;
        v()[a >> 2] = a;
        c = { ma: g, na: p, Aa: b, detached: m, Ya: c, va: t, pa: e, fb: h };
        return F ? ((c.hb = 'spawnThread'), postMessage(c, h), 0) : $a(c);
      },
      D: function (a) {
        F ? A.Ma(a) : (A.Ka(), ab(a));
        throw 'unwind';
      },
      E: function (a, b) {
        return hb(a, b);
      },
      k: mb,
      t: nb,
      u: ob,
      l: function (a, b) {
        if (a == b) postMessage({ cmd: 'processQueuedMainThreadWork' });
        else if (F) postMessage({ targetThread: a, cmd: 'processThreadQueue' });
        else {
          a = (a = A.ia[a]) && a.worker;
          if (!a) return;
          a.postMessage({ cmd: 'processThreadQueue' });
        }
        return 1;
      },
      b: pb,
      q: function (a, b) {
        if (0 === a) a = Date.now();
        else if (1 === a || 4 === a) a = db();
        else return (v()[cc() >> 2] = 28), -1;
        v()[b >> 2] = (a / 1e3) | 0;
        v()[(b + 4) >> 2] = ((a % 1e3) * 1e6) | 0;
        return 0;
      },
      p: function (a, b, c) {
        qb.length = 0;
        var e;
        for (c >>= 2; (e = u()[b++]); )
          (e = 105 > e) && c & 1 && c++,
            qb.push(e ? ea()[c++ >> 1] : v()[c]),
            ++c;
        return Qa[a].apply(null, qb);
      },
      z: gb,
      i: function () {},
      d: fb,
      e: Sa,
      f: db,
      n: function (a, b, c) {
        u().copyWithin(a, b, b + c);
      },
      A: function (a, b, c) {
        tb.length = b;
        c >>= 3;
        for (var e = 0; e < b; e++) tb[e] = ea()[c + e];
        return (0 > a ? Qa[-a - 1] : $b[a]).apply(null, tb);
      },
      o: function (a) {
        var b = u().length;
        a >>>= 0;
        if (a <= b || 2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
          var e = b * (1 + 0.2 / c);
          e = Math.min(e, a + 100663296);
          e = Math.max(a, e);
          0 < e % 65536 && (e += 65536 - (e % 65536));
          a: {
            try {
              k.grow((Math.min(2147483648, e) - l.byteLength + 65535) >>> 16);
              n(k.buffer);
              var h = 1;
              break a;
            } catch (g) {}
            h = void 0;
          }
          if (h) return !0;
        }
        return !1;
      },
      B: function (a, b, c) {
        return vb(a) ? wb(a, b, c) : yb(a, b, c);
      },
      h: function () {},
      H: function (a, b, c) {
        Ja += 1;
        return setTimeout(function () {
          --Ja;
          zb(function () {
            T.get(a)(c);
          });
        }, b);
      },
      C: function (a, b) {
        b >>= 2;
        var c = v()[b + 6];
        b = {
          alpha: !!v()[b],
          depth: !!v()[b + 1],
          stencil: !!v()[b + 2],
          antialias: !!v()[b + 3],
          premultipliedAlpha: !!v()[b + 4],
          preserveDrawingBuffer: !!v()[b + 5],
          powerPreference: Ib[c],
          failIfMajorPerformanceCaveat: !!v()[b + 7],
          Ua: v()[b + 8],
          ob: v()[b + 9],
          Ga: v()[b + 10],
          Oa: v()[b + 11],
          qb: v()[b + 12],
          rb: v()[b + 13],
        };
        a = vb(a);
        return !a || b.Oa ? 0 : Eb(a, b);
      },
      w: Nb,
      x: Ob,
      g: function (a) {
        ab(a);
      },
      j: Pb,
      s: Qb,
      m: Rb,
      r: Sb,
      G: function () {
        A.Sa();
      },
      a: k || z.wasmMemory,
      v: function (a, b, c, e) {
        return Yb(a, b, c, e);
      },
    };
    (function () {
      function a(h, g) {
        z.asm = h.exports;
        T = z.asm.O;
        Ga.unshift(z.asm.I);
        A.Ea.push(z.asm.N);
        ua = g;
        if (!F) {
          var m = A.ka.length;
          A.ka.forEach(function (p) {
            A.Ia(p, function () {
              if (
                !--m &&
                (U--,
                z.monitorRunDependencies && z.monitorRunDependencies(U),
                0 == U && (null !== La && (clearInterval(La), (La = null)), Ma))
              ) {
                var t = Ma;
                Ma = null;
                t();
              }
            });
          });
        }
      }
      function b(h) {
        a(h.instance, h.module);
      }
      function c(h) {
        return Pa()
          .then(function (g) {
            return WebAssembly.instantiate(g, e);
          })
          .then(h, function (g) {
            P('failed to asynchronously prepare wasm: ' + g);
            M(g);
          });
      }
      var e = { a: dc };
      F || (U++, z.monitorRunDependencies && z.monitorRunDependencies(U));
      if (z.instantiateWasm)
        try {
          return z.instantiateWasm(e, a);
        } catch (h) {
          return (
            P('Module.instantiateWasm callback failed with error: ' + h), !1
          );
        }
      (function () {
        return sa ||
          'function' !== typeof WebAssembly.instantiateStreaming ||
          Na() ||
          'function' !== typeof fetch
          ? c(b)
          : fetch(V, { credentials: 'same-origin' }).then(function (h) {
              return WebAssembly.instantiateStreaming(h, e).then(
                b,
                function (g) {
                  P('wasm streaming compile failed: ' + g);
                  P('falling back to ArrayBuffer instantiation');
                  return c(b);
                },
              );
            });
      })().catch(ja);
      return {};
    })();
    z.___wasm_call_ctors = function () {
      return (z.___wasm_call_ctors = z.asm.I).apply(null, arguments);
    };
    z._main = function () {
      return (z._main = z.asm.J).apply(null, arguments);
    };
    var X = (z._malloc = function () {
        return (X = z._malloc = z.asm.K).apply(null, arguments);
      }),
      Xa = (z._free = function () {
        return (Xa = z._free = z.asm.L).apply(null, arguments);
      });
    z._uci_command = function () {
      return (z._uci_command = z.asm.M).apply(null, arguments);
    };
    z._emscripten_tls_init = function () {
      return (z._emscripten_tls_init = z.asm.N).apply(null, arguments);
    };
    z._emscripten_current_thread_process_queued_calls = function () {
      return (z._emscripten_current_thread_process_queued_calls =
        z.asm.P).apply(null, arguments);
    };
    var Va = (z._emscripten_register_main_browser_thread_id = function () {
        return (Va = z._emscripten_register_main_browser_thread_id =
          z.asm.Q).apply(null, arguments);
      }),
      ib = (z._emscripten_main_browser_thread_id = function () {
        return (ib = z._emscripten_main_browser_thread_id = z.asm.R).apply(
          null,
          arguments,
        );
      }),
      ac = (z._emscripten_sync_run_in_main_thread_4 = function () {
        return (ac = z._emscripten_sync_run_in_main_thread_4 = z.asm.S).apply(
          null,
          arguments,
        );
      }),
      Za = (z._emscripten_main_thread_process_queued_calls = function () {
        return (Za = z._emscripten_main_thread_process_queued_calls =
          z.asm.T).apply(null, arguments);
      }),
      sb = (z._emscripten_run_in_main_runtime_thread_js = function () {
        return (sb = z._emscripten_run_in_main_runtime_thread_js =
          z.asm.U).apply(null, arguments);
      }),
      xb = (z.__emscripten_call_on_thread = function () {
        return (xb = z.__emscripten_call_on_thread = z.asm.V).apply(
          null,
          arguments,
        );
      }),
      jb = (z._pthread_testcancel = function () {
        return (jb = z._pthread_testcancel = z.asm.W).apply(null, arguments);
      }),
      Y = (z._pthread_self = function () {
        return (Y = z._pthread_self = z.asm.X).apply(null, arguments);
      }),
      Ab = (z._pthread_exit = function () {
        return (Ab = z._pthread_exit = z.asm.Y).apply(null, arguments);
      }),
      Ua = (z.__emscripten_thread_init = function () {
        return (Ua = z.__emscripten_thread_init = z.asm.Z).apply(
          null,
          arguments,
        );
      }),
      cc = (z.___errno_location = function () {
        return (cc = z.___errno_location = z.asm._).apply(null, arguments);
      }),
      eb = (z._emscripten_get_global_libc = function () {
        return (eb = z._emscripten_get_global_libc = z.asm.$).apply(
          null,
          arguments,
        );
      }),
      Wa = (z.___pthread_tsd_run_dtors = function () {
        return (Wa = z.___pthread_tsd_run_dtors = z.asm.aa).apply(
          null,
          arguments,
        );
      }),
      rb = (z.stackSave = function () {
        return (rb = z.stackSave = z.asm.ba).apply(null, arguments);
      }),
      cb = (z.stackRestore = function () {
        return (cb = z.stackRestore = z.asm.ca).apply(null, arguments);
      }),
      S = (z.stackAlloc = function () {
        return (S = z.stackAlloc = z.asm.da).apply(null, arguments);
      }),
      bb = (z._emscripten_stack_set_limits = function () {
        return (bb = z._emscripten_stack_set_limits = z.asm.ea).apply(
          null,
          arguments,
        );
      }),
      bc = (z._memalign = function () {
        return (bc = z._memalign = z.asm.fa).apply(null, arguments);
      }),
      Ya = (z.__emscripten_allow_main_runtime_queued_calls = 25084),
      W = (z.__emscripten_main_thread_futex = 1088072);
    z.ccall = function (a, b, c, e) {
      var h = {
        string: function (r) {
          var x = 0;
          if (null !== r && void 0 !== r && 0 !== r) {
            var fa = (r.length << 2) + 1,
              ta = (x = S(fa));
            Aa(r, u(), ta, fa);
          }
          return x;
        },
        array: function (r) {
          var x = S(r.length);
          Da(r, x);
          return x;
        },
      };
      a = wa(a);
      var g = [],
        m = 0;
      if (e)
        for (var p = 0; p < e.length; p++) {
          var t = h[c[p]];
          t ? (0 === m && (m = rb()), (g[p] = t(e[p]))) : (g[p] = e[p]);
        }
      c = a.apply(null, g);
      return (c = (function (r) {
        0 !== m && cb(m);
        return 'string' === b ? R(r) : 'boolean' === b ? !!r : r;
      })(c));
    };
    z.keepRuntimeAlive = N;
    z.PThread = A;
    z.PThread = A;
    z.wasmMemory = k;
    z.ExitStatus = L;
    var ec;
    function L(a) {
      this.name = 'ExitStatus';
      this.message = 'Program terminated with exit(' + a + ')';
      this.status = a;
    }
    Ma = function fc() {
      ec || gc();
      ec || (Ma = fc);
    };
    function gc(a) {
      function b() {
        if (!ec && ((ec = !0), (z.calledRun = !0), !va)) {
          F || Ra(Ga);
          F || Ra(Ha);
          ia(z);
          if (z.onRuntimeInitialized) z.onRuntimeInitialized();
          if (hc) {
            var c = a,
              e = z._main;
            c = c || [];
            var h = c.length + 1,
              g = S(4 * (h + 1));
            v()[g >> 2] = Ca(la);
            for (var m = 1; m < h; m++) v()[(g >> 2) + m] = Ca(c[m - 1]);
            v()[(g >> 2) + h] = 0;
            try {
              var p = e(h, g);
              ab(p, !0);
            } catch (t) {
              t instanceof L ||
                'unwind' == t ||
                ((c = t) &&
                  'object' === typeof t &&
                  t.stack &&
                  (c = [t, t.stack]),
                P('exception thrown: ' + c),
                ma(1, t));
            } finally {
            }
          }
          if (!F) {
            if (z.postRun)
              for (
                'function' == typeof z.postRun && (z.postRun = [z.postRun]);
                z.postRun.length;

              )
                (c = z.postRun.shift()), Ia.unshift(c);
            Ra(Ia);
          }
        }
      }
      a = a || ka;
      if (!(0 < U))
        if (F) ia(z), F || Ra(Ga), postMessage({ cmd: 'loaded' });
        else {
          if (!F) {
            if (z.preRun)
              for (
                'function' == typeof z.preRun && (z.preRun = [z.preRun]);
                z.preRun.length;

              )
                Ka();
            Ra(Fa);
          }
          0 < U ||
            (z.setStatus
              ? (z.setStatus('Running...'),
                setTimeout(function () {
                  setTimeout(function () {
                    z.setStatus('');
                  }, 1);
                  b();
                }, 1))
              : b());
        }
    }
    z.run = gc;
    function ab(a, b) {
      Q = a;
      if (!b && F)
        throw (postMessage({ cmd: 'exitProcess', returnCode: a }), new L(a));
      N() || A.Ca();
      Q = a;
      if (!N()) {
        A.Ca();
        if (z.onExit) z.onExit(a);
        va = !0;
      }
      ma(a, new L(a));
    }
    if (z.preInit)
      for (
        'function' == typeof z.preInit && (z.preInit = [z.preInit]);
        0 < z.preInit.length;

      )
        z.preInit.pop()();
    var hc = !0;
    z.noInitialRun && (hc = !1);
    F && ((noExitRuntime = !1), A.Ta());
    gc();

    return Stockfish.ready;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Stockfish;
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return Stockfish;
  });
else if (typeof exports === 'object') exports['Stockfish'] = Stockfish;
