import axios from 'axios';

class Api {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://explorer.lichess.ovh',
      timeout: 10000,
    });
  }

  async getExplorerMoves(fen) {
    return this.client.get(
      `lichess?fen=${fen}&play=&variant=standard&ratings=1600,1800,2000,2200,2500&speeds=bullet,blitz,rapid,classical`,
    );
  }
}

export const api = new Api();
