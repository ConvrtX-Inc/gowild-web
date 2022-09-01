// import type { any } from "../types/route-lists";

class JurisdictionApi {
  getWorkspaces(): Promise<any[]> {
    const jurisdictions: any[] = [
      {
        id: '5e887ac47eed253091be10cb',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'First On The List',
        email: 'adrianwallace.mail.com',
        hasAcceptedMarketing: true,
        isProspect: false,
        isReturning: true,
        name: 'Adrian Wallace',
        caseIdNo: 712027,
        caseTitle: 'Possible Drug Dealers',
        updatedAt: '2021-09-24T09:45:22+0800'
      },
      {
        id: '5e887b209c28ac3dd97f6db5',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction02',
        email: 'cameron_w@gmail.com',
        hasAcceptedMarketing: true,
        isProspect: true,
        isReturning: false,
        name: 'Cameron Williamson',
        caseIdNo: 657812,
        caseTitle: 'Case of Luis F.',
        updatedAt: '2021-09-16T07:21:03+0800'
      },
      {
        id: '5e887b7602bdbc4dbb234b27',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction05',
        email: 'warren_wade.mail.com',
        hasAcceptedMarketing: false,
        isProspect: false,
        isReturning: false,
        name: 'Wade Warren',
        caseIdNo: 983450,
        caseTitle: 'Case of Terrel B.',
        updatedAt: '2021-09-15T10:11:11+0800'
      },
      {
        id: '5e86809283e28b96d2d38537',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction06',
        email: 'oldest@gmail.com',
        hasAcceptedMarketing: true,
        isProspect: false,
        isReturning: true,
        name: 'Oldest Saris',
        caseIdNo: 456345,
        caseTitle: 'Possible Terrorists',
        updatedAt: '2021-09-12T08:56:32+0800'
      },
      {
        id: '5e86805e2bafd54f66cc95c3',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction10',
        email: 'kianna_bator@mail.com',
        hasAcceptedMarketing: true,
        isProspect: true,
        isReturning: false,
        name: 'Kianna Bator',
        caseIdNo: 109206,
        caseTitle: 'Case Study File #0921',
        updatedAt: '2021-09-08T01:32:22+0800'
      },
      {
        id: '5e887a1fbefd7938eea9c981',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction11',
        email: 'ahamad_dias.mail.com',
        hasAcceptedMarketing: false,
        isProspect: true,
        isReturning: false,
        name: 'Ahmad Dias',
        caseIdNo: 213244,
        caseTitle: 'Look Out For Jame.L',
        updatedAt: '2021-09-02T03:54:59+0800'
      },
      {
        id: '5e887d0b3d090c1b8f162003',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        email: 'v.michael@mail.com',
        hasAcceptedMarketing: true,
        isProspect: false,
        isReturning: false,
        jurisdiction: 'Jurisdiction03',
        name: 'Michael V.',
        caseIdNo: 333333,
        caseTitle: 'Chainsaw Massacre',
        updatedAt: '2021-09-02T03:54:59+0800'
      },
      {
        id: '5e88792be2d4cfb4bf0971d9',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction04',
        email: 'holo.mysterio@mail.com',
        hasAcceptedMarketing: true,
        isProspect: false,
        isReturning: true,
        name: 'Mysterio Holo',
        caseIdNo: 444444,
        caseTitle: 'Exposure of Spiderman',
        updatedAt: '2021-09-02T03:54:59+0800'
      },
      {
        id: '5e8877da9a65442b11551975',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction07',
        email: 'kim.atienza@mail.com',
        hasAcceptedMarketing: true,
        isProspect: true,
        isReturning: false,
        name: 'Kim Atienza',
        caseIdNo: 777777,
        caseTitle: 'Case of John Wick',
        updatedAt: '2021-09-02T03:54:59+0800'
      },
      {
        id: '5e8680e60cba5019c5ca6fda',
        avatar: '/static/mock-images/avatars/adrian-wallace.png',
        jurisdiction: 'Jurisdiction08',
        email: 'zelenskyy.vo@ukraine.com',
        hasAcceptedMarketing: false,
        isProspect: false,
        isReturning: true,
        name: 'Volodymr Zelenskyy',
        caseIdNo: 888888,
        caseTitle: 'Russian Special Military Ops',
        updatedAt: '2021-09-02T03:54:59+0800'
      }
    ];

    return Promise.resolve(jurisdictions);
  }

  getJurisdiction(): Promise<any> {
    const jurisdiction: any = {
      id: '5e86805e2bafd54f66cc95c3',
      address1: 'Street John Wick, no. 7',
      address2: 'House #25',
      jurisdiction: 'Jurisdiction09',
      email: 'miron.vitold@mail.com',
      hasDiscountedPrices: false,
      isVerified: true,
      name: 'Miron Vitold',
      phone: '+123 456 789'
    };

    return Promise.resolve(jurisdiction);
  }
}

export const jurisdictionApi = new JurisdictionApi();
