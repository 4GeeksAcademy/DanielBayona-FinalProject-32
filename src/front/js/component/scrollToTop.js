import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

<<<<<<< HEAD
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any,
};
=======
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.any.isRequired
};

export default ScrollToTop;
>>>>>>> develop
