import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  newspaperOutline, trendingUpOutline, createOutline, searchOutline, personCircleOutline
} from 'ionicons/icons'
import News from "./pages/Tabs/News"
import Trending from "./pages/Tabs/Trending"
import Search from "./pages/Tabs/Search"
import Submit from "./pages/Tabs/Submit"
import Profile from "./pages/Tabs/Profile"


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/news" />}></Route>
          <Route exact path="/news" component={News}></Route>
          <Route exact path="/trending" component={Trending}></Route>
          <Route exact path="/submit" component={Submit}></Route>
          <Route exact path="/search" component={Search}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route component={() =><Redirect to="/news" />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="news" href="/news">
            <IonIcon icon={newspaperOutline} />
            <IonLabel>Newsy</IonLabel>
          </IonTabButton>
          <IonTabButton tab="trending" href="/trending">
            <IonIcon icon={trendingUpOutline} />
            <IonLabel>Trending</IonLabel>
          </IonTabButton>
          <IonTabButton tab="submit" href="/submit">
            <IonIcon icon={createOutline} />
            <IonLabel>Submit</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;