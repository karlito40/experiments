import Screen from './Screen';
import Test from './Test';

export default {
  namespace: 'Main',
  name: 'Main',
  store: {
    [Screen.name]: Screen,
    [Test.name]: Test,
  }
}