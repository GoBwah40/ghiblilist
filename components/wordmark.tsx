/**
 * Logotype « The GhibliList ». Un seul balisage, stylé différemment par chaque thème
 * (styles/globals.css). Les ornements sont masqués aux lecteurs d'écran : le nom lu
 * reste toujours « The GhibliList ».
 */
const Wordmark = () => (
  <span className="wordmark">
    <span className="wm-jp" aria-hidden="true">
      ジブリ
    </span>
    <span>
      <span className="wm-the">The</span>
      <span className="wm-br" aria-hidden="true" />{' '}
      <span className="wm-name">
        Ghibli<span className="wm-list">List</span>
      </span>
      <span className="wm-leaf" aria-hidden="true" />
    </span>
    <span className="wm-sub" aria-hidden="true">
      ジブリ・リスト
    </span>
  </span>
);

export default Wordmark;
