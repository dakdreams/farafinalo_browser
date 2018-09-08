import React from 'react';
import { Responsive, Segment } from 'semantic-ui-react';

import MobileMenu from './moblile';
import ComputerMenu from './computer';

const ResponsiveExampleBreakpoints = () => (
  <Segment.Group>
    <Responsive {...Responsive.onlyMobile}><MobileMenu /></Responsive>
    <Responsive {...Responsive.onlyTablet}><ComputerMenu /></Responsive>
    <Responsive {...Responsive.onlyComputer}><ComputerMenu /></Responsive>
  </Segment.Group>
);

export default ResponsiveExampleBreakpoints;
