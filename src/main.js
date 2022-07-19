import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import BaseCard from './components/base/BaseCard';
import BaseButton from './components/base/BaseButton';
import BaseBadge from './components/base/BaseBadge';
import BaseSpinner from './components/base/BaseSpinner';
import BaseDialog from './components/base/BaseDialog';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
