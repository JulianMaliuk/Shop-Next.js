import React from 'react';
import { Dimmer, Loader as LoaderSemantic, Segment } from 'semantic-ui-react';

const Loader = ({ isLoading, children }) => (
  isLoading 
  ? <Segment style={{ padding: '50px' }}>
      <Dimmer active inverted>
        <LoaderSemantic inverted>Loading</LoaderSemantic>
      </Dimmer>
    </Segment>
  : children
)

export default Loader