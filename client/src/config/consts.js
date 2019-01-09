const interestsOptions = [
  { icon: 'fas fa-bicycle', value: 0, title: 'Riding bicycle', key: 0 },
  { icon: 'fas fa-suitcase', value: 1, title: 'Travel', key: 1 },
  { icon: 'fas fa-music', value: 2, title: 'Listen Music', key: 2 },
  { icon: 'fas fa-shopping-cart', value: 3, title: 'Shopping', key: 3 },
  { icon: 'fas fa-camera', value: 4, title: 'Photography', key: 4 },
  { icon: 'fas fa-utensils', value: 5, title: 'Eating', key: 5 },
  { icon: 'fas fa-futbol', value: 6, title: 'Football', key: 6 },
  { icon: 'fas fa-book', value: 7, title: 'Reading book', key: 7 }
];

const jobTitleOptions = [
  { label: 'Select', value: 0 },
  { label: 'Software engineer', value: 1 },
  { label: 'Seller', value: 2 },
  { label: 'Manager', value: 3 },
  { label: 'Photographer', value: 4 },
  { label: 'Other', value: 5 }
];

const friendshipsStatusForActiveUser = Object.freeze({
  NOT_DEFINE: ['Send request'],
  REQUESTED: ['Requested'],
  ACCEPTED: ['Cancel friend'],
  REJECTED: ['Rejected']
});

const friendshipsStatus = Object.freeze({
  REQUESTED: ['Accept friend', 'Reject request'],
  ACCEPTED: ['Cancel friend'],
  REJECTED: ['Request rejected']
});

const friendshipsAction = Object.freeze({
  'Send request': 'REQUESTED',
  'Accept friend': 'ACCEPTED',
  'Cancel friend': 'DELETE',
  'Reject request': 'REJECTED'
});

module.exports = {
  interestsOptions,
  jobTitleOptions,
  friendshipsStatus,
  friendshipsStatusForActiveUser,
  friendshipsAction
};
