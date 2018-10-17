import { html } from 'https://dev.jspm.io/lit-html';
import Component from '../../lib/component.js';
import history from '../../lib/history.js';
import { store, updateStore } from '../../models/index.js';
import '../form/button.js';

const InitData = Object.assign({}, store.confirmState);

export default class Confirm extends Component {
  static open(state) {
    updateStore('confirmState', {
      ...InitData,
      ...state,
    });
    history.push({
      title: state.title,
      path: window.location.pathname,
      query: window.location.search,
      close: Confirm.close,
    });
  }

  static close() {
    updateStore('confirmState', InitData);
  }

  constructor() {
    super();
    this.state = store.confirmState;
    this.okHandle = this.okHandle.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
  }

  okHandle() {
    const { oncomplete } = this.state;
    if (oncomplete) oncomplete();
    Confirm.close();
    history.back();
  }

  cancelHandle() {
    const { oncancel } = this.state;
    if (oncancel) oncancel();
    Confirm.close();
    history.back();
  }

  render() {
    const {
      title, complete, cancel, text,
    } = this.state;
    if (!text) {
      this.hidden = true;
      return html``;
    }
    this.hidden = false;
    return html`
      <style>
        :host {
          z-index: 10;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
        }
        .backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }
        .warp {
          flex-shrink: 1;
          position: absolute;
          width: 25rem;
          padding: 1.6rem;
          border-radius: .2rem;
          background: var(--modal-background-color);
          color: var(--modal-text-primary-color);
          fill: var(--modal-text-primary-color);
          box-shadow: var(--modal-box-shadow);
          overflow: auto;
        }
        .title {
          flex-grow: 1;
          margin: 0;
          padding: 0;
          font-size: 2rem;
          font-weight: bolder;
          text-transform: capitalize;
        }
        .body {
          min-height: 5em;
        }
        .footer {
          display: flex;
          flex-direction: row-reverse;
        }
      </style>
      <div class="backdrop"></div>
      <div class="warp">
        <h1 class="title" ?hidden="${!title}">${title}</h1>
      <div class="body">${text}</div>
        <div class="footer">
            <form-button
              @click="${this.okHandle}"
              ?hidden="${!complete}">
              ${complete}
            </form-button>
            <form-button
              @click="${this.cancelHandle}"
              ?hidden="${!cancel}"
              type="secondary">
              ${cancel}
            </form-button>
        </div>
      </div>
    `;
  }
}

customElements.define('app-confirm', Confirm);
