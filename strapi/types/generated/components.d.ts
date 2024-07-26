import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedDisplaySection extends Schema.Component {
  collectionName: 'components_shared_display_sections';
  info: {
    displayName: 'DisplaySection';
    icon: 'cube';
  };
  attributes: {
    title: Attribute.String;
    displayText: Attribute.Text;
  };
}

export interface SharedDisplaySize extends Schema.Component {
  collectionName: 'components_shared_display_sizes';
  info: {
    displayName: 'DisplaySize';
    icon: 'apps';
  };
  attributes: {
    size: Attribute.Integer;
  };
}

export interface SharedI18NConfig extends Schema.Component {
  collectionName: 'components_shared_i18n_configs';
  info: {
    displayName: 'I18nConfig';
    icon: 'apps';
    description: '';
  };
  attributes: {
    namespace: Attribute.String;
    config: Attribute.JSON;
  };
}

export interface SharedLink extends Schema.Component {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    url: Attribute.String;
  };
}

export interface SharedNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
    icon: 'apps';
    description: '';
  };
  attributes: {
    links: Attribute.Component<'shared.link', true>;
  };
}

export interface SharedNotFound extends Schema.Component {
  collectionName: 'components_shared_not_founds';
  info: {
    displayName: 'NotFound';
    icon: 'apps';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    back: Attribute.String;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'RichText';
    icon: 'cube';
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'apps';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface SharedSocialLink extends Schema.Component {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'SocialLink';
    icon: 'apps';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    kind: Attribute.Enumeration<
      [
        'wechart',
        'weibo',
        'mail',
        'youtube',
        'instagram',
        'facebook',
        'x',
        'rss'
      ]
    >;
  };
}

export interface SharedSocialbar extends Schema.Component {
  collectionName: 'components_shared_socialbars';
  info: {
    displayName: 'Socialbar';
  };
  attributes: {
    links: Attribute.Component<'shared.social-link', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.display-section': SharedDisplaySection;
      'shared.display-size': SharedDisplaySize;
      'shared.i18n-config': SharedI18NConfig;
      'shared.link': SharedLink;
      'shared.navbar': SharedNavbar;
      'shared.not-found': SharedNotFound;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.socialbar': SharedSocialbar;
    }
  }
}
