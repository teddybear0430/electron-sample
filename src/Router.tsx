import React from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Home from './views/Home';
import Setting from './views/Setting';

// MEMO: Electronではアクセスは常に/に来るようになっているので、HashRouterを使用する
const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/setting" component={Setting} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
