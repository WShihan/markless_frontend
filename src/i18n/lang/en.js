export const lang = {
  page: {
    tags: {
      add: {
        summary: 'Add Tag',
        placeholder: 'Separate multiple tags with &',
      },
      manage: {
        summary: 'Manage Tags',
        placeholder: {
          selectTag: 'Select Tag',
          appliedTag: 'Select Bound Bookmarks',
        },
        tip: '↑↑ Select applied bookmarks ↓↓',
      },
    },
    'link-all': {
      search: {
        placeholder: 'Search',
        select: {
          all: 'All',
          read: 'Read',
          unread: 'Unread',
        },
      },
      mark: {
        read: 'Mark All as Read',
        unread: 'Mark All as Unread',
      },
    },
    'link-add': {
      label: {
        url: 'Link',
        desc: 'Description',
        read: 'Read',
        tag: 'Tag',
      },
      summary: 'Other Options',
      placeholder: 'Please select a tag',
    },
    'link-edit': {
      label: {
        url: 'Link',
        title: 'Title',
        desc: 'Description',
        read: 'Read',
        tag: 'Tag',
      },
      summary: {
        info: 'Bookmark Information',
        tag: 'Tag',
      },
      placeholder: 'Please select a tag',
      tip: {
        'link-info-get-failed': 'Failed to get bookmark information',
        'link-info-get-success': 'Successfully retrieved bookmark information',
        'link-info-update-failed': 'Failed to update bookmark information',
        'link-info-update-success': 'Successfully updated bookmark information',
        'link-tag-update-failed': 'Failed to update tag',
        'link-tag-update-success': 'Successfully updated tag',
      },
    },
    'link-archive': {
      summary: 'Archive Information',
      label: {
        url: 'Link',
        title: 'Title',
        desc: 'Description',
        tag: 'Tag',
      },
      tip: {
        'info-get-success': 'Successfully retrieved bookmark information',
        'info-get-failed': 'Failed to get bookmark information',
      },
    },
    setting: {
      label: {
        username: 'Username',
        admin: 'Admin',
        lang: 'Language',
        theme: 'Theme',
        'password-now': 'Old',
        'password-new': 'New',
        'password-confirm': 'Confirm',
        'base-url': 'Base URL',
        version: 'Version',
        'git-id': 'Git ID',
        'build-time': 'Build',
        'lang-opt': {
          en: 'English',
          'zh-TW': 'Traditional Chinese',
          'zh-CN': 'Simplified Chinese',
        },
        'theme-opt': {
          normal: 'Normal',
          dark: 'Dark',
        },
      },
      summary: {
        user: 'User',
        password: 'Password',
        token: 'Key',
        env: 'Application',
      },
    },
    login: {
      label: {
        username: 'Username',
        password: 'Password',
        submit: 'Login',
        'to-register': 'Go to Register',
        tip: {
          'username-invalid': 'Invalid Username',
          'password-invalid': 'Invalid Password',
        },
      },
    },
    register: {
      label: {
        username: 'Username',
        password: 'Password',
        'password-confirm': 'Confirm',
        submit: 'Register',
        'to-login': 'Go to Login',
      },
      tip: {
        'username-invalid': 'Invalid Username',
        'password-invalid': 'Invalid Password',
        'password-inconsistent': 'Passwords do not match',
      },
    },
  },
  link: {
    label: {
      read: 'Mark as Read',
      unread: 'Mark as Unread',
      edit: 'Edit',
      copy: 'Copy Link',
      archive: 'archive',
      delete: 'Delete',
    },
  },
  navs: {
    'link-all': 'Bookmarks',
    'link-add': '+ Bookmark',
    tags: 'Tags',
    setting: 'Settings',
    logout: 'Logout',
  },
  confirm: {
    update: 'Are you sure you want to update?',
    delete: 'Are you sure you want to delete?',
    add: 'Are you sure you want to add?',
    cancel: 'Cancel',
  },
  submit: {
    update: 'Update',
    delete: 'Delete',
    add: 'Add',
    create: 'Create',
    cancel: 'Cancel',
    login: 'Login',
    register: 'Register',
  },
  message: {
    success: {
      add: 'Added Successfully',
      update: 'Updated Successfully',
      delete: 'Deleted Successfully',
      common: 'Success',
      register: 'Registered Successfully',
    },
    failed: {
      get: 'Failed to retrieve information',
      add: 'Failed to add',
      update: 'Failed to update',
      delete: 'Failed to delete',
      common: 'Operation Failed',
      register: 'Registration Failed',
    },
  },
};

export default lang;
