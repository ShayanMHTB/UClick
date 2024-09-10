// UClick/src/components/layout/AppTabs.tsx

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import ServiceDetailPage from '@/pages/services/ServiceDetailPage';
import EventsPage from '@/pages/EventsPage';
import MessagesPage from '@/pages/MessagesPage';
import ProfilePage from '@/pages/ProfilePage';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Route Guard Component
import ProtectedRoute from '@/components/routing/ProtectedRoute';

setupIonicReact();

const AppTabs: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        {/* Authentication Routes */}
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />

        {/* Protected Tab Routes */}
        <ProtectedRoute path="/app">
          <IonTabs>
            <IonRouterOutlet>
              {/* Home Tab */}
              <Route exact path="/app/home" component={HomePage} />

              {/* Services Tab with nested routes */}
              <Route exact path="/app/services" component={ServicesPage} />
              <Route
                exact
                path="/app/services/:id"
                component={ServiceDetailPage}
              />

              {/* Events Tab */}
              <Route exact path="/app/events" component={EventsPage} />

              {/* Messages Tab */}
              <Route exact path="/app/messages" component={MessagesPage} />

              {/* Profile Tab */}
              <Route exact path="/app/profile" component={ProfilePage} />

              {/* Default redirect to home */}
              <Route exact path="/app">
                <Redirect to="/app/home" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/app/home">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="services" href="/app/services">
                <IonIcon aria-hidden="true" icon={searchOutline} />
                <IonLabel>Services</IonLabel>
              </IonTabButton>

              <IonTabButton tab="events" href="/app/events">
                <IonIcon aria-hidden="true" icon={calendarOutline} />
                <IonLabel>Events</IonLabel>
              </IonTabButton>

              <IonTabButton tab="messages" href="/app/messages">
                <IonIcon aria-hidden="true" icon={chatbubblesOutline} />
                <IonLabel>Messages</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/app/profile">
                <IonIcon aria-hidden="true" icon={personOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </ProtectedRoute>

        {/* Root redirect */}
        <Route exact path="/">
          <Redirect to="/app/home" />
        </Route>
      </Switch>
    </IonReactRouter>
  </IonApp>
);

export default AppTabs;
