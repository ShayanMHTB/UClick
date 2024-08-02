// UClick/src/components/layout/AppTabs.tsx

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  searchOutline,
  calendarOutline,
  chatbubblesOutline,
  personOutline,
} from 'ionicons/icons';

// Pages
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import EventsPage from '@/pages/EventsPage';
import MessagesPage from '@/pages/MessagesPage';
import ProfilePage from '@/pages/ProfilePage';

setupIonicReact();

const AppTabs: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/services">
            <ServicesPage />
          </Route>
          <Route exact path="/events">
            <EventsPage />
          </Route>
          <Route exact path="/messages">
            <MessagesPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="services" href="/services">
            <IonIcon aria-hidden="true" icon={searchOutline} />
            <IonLabel>Services</IonLabel>
          </IonTabButton>

          <IonTabButton tab="events" href="/events">
            <IonIcon aria-hidden="true" icon={calendarOutline} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>

          <IonTabButton tab="messages" href="/messages">
            <IonIcon aria-hidden="true" icon={chatbubblesOutline} />
            <IonLabel>Messages</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default AppTabs;
