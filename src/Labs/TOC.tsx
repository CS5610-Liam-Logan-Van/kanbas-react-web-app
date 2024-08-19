import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  return (
      <ul className="nav nav-pills">
          <li className="nav-item">
              <a id="wd-k" href="https://github.com/CS5610-Liam-Logan-Van/kanbas-react-web-app" className="nav-link">
                  React Repo
              </a>
          </li>
          <li className="nav-item">
              <a id="wd-k" href="https://github.com/CS5610-Liam-Logan-Van/kanbas-node-server-app" className="nav-link">
                  Node Repo
              </a>
          </li>
          <li className="nav-item">
              <a id="wd-k" href="#/Kanbas" className="nav-link">
                  Kanbas
              </a>
          </li>

      </ul>
  );
}

