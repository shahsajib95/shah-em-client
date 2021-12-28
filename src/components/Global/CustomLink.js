import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          style={{color: match ? 'red' : 'black', borderBottom: match ? '1px solid red' : ''}}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    );
  }