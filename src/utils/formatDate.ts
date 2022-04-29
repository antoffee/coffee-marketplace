import moment from 'moment';

import 'moment/locale/ru';

export const formatDate = (date: Date | string | number) => moment(date).locale('ru').format('DD MMMM YYYY, HH:mm');
