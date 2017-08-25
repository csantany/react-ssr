// HTML
import html from './html';

export default function serverRender() {
  return (req, res, next) => {
    if (req.isBot) {
      return next();
    }

    const initialState = {
      device: {
        isMobile: res.locals.isMobile
      }
    };

    res.send(html({
      markup: '',
      initialState
    }));
  };
}
