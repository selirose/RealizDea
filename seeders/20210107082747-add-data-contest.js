'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('contest', [{
      title: "Shabby Chic Romantic Floral Logo",
      id_provider: "2",
      prize: "5000000",
      due_date: "2021-02-23 00:00:00",
      description: "Custom feminine beaded jewelry from apple watch bands to stacked bracelets and rhinestone covered cellphone cases, etc. Designing with semi precious gems and Swarovski crystals",
      id_status_contest: "1",
      announcement: "2021-02-25 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "luxury minimalist design for high end bathroom and kitchen remodelling",
      id_provider: "2",
      prize: "10000000",
      due_date: "2021-02-15 00:00:00",
      description: "We are a high end bathroom kitchen and laundry renovations company that also has in house premium wall and floor tilers. we use products like italian carara marble stone, washed cement look porcelain, timber finishes and gold and black tapware. I feel these elements could be used in the logo design. Our clientele are sophisticated high end professionals with a taste for luxury",
      id_status_contest: "1",
      announcement: "2021-02-19 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Modern Creative Company Logo",
      id_provider: "2",
      prize: "12000000",
      due_date: "2021-03-03 00:00:00",
      description: "We offer users a fun and simple way to interact with big data and convert them whilst giving them information they want to see. Our creations are mostly for the online gambling industry but we also do networking and stock platforms. The logo should be simplistic and can use a letter C or show that we are creative. You can check our website casonix.com for additional information about us.",
      id_status_contest: "1",
      announcement: "2021-03-07 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Innovative Health Care Logo",
      id_provider: "2",
      prize: "15000000",
      due_date: "2021-01-24 00:00:00",
      description: "The IHC team has extensive expertise in providing expertise in the following areas to help Companies build their revenues and design strategies to seamlessly deploy new technological solutions with minimal need for changes to existing client legacy systems.",
      id_status_contest: "2",
      announcement: "2021-01-24 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Hauling Logo design for everyone",
      id_provider: "3",
      prize: "5000000",
      due_date: "2021-02-20 00:00:00",
      description: "offers full-service junk removal for your home or business. We can help you get rid of anything--that dingy couch, the broken washer, the clutter in the garage or construction debris.",
      id_status_contest: "1",
      announcement: "2021-02-24 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Local news source for Napa wine country",
      id_provider: "3",
      prize: "10000000",
      due_date: "2021-02-15 00:00:00",
      description: "News source. We will be on social media, a website and a weekly newsletter for local news",
      id_status_contest: "1",
      announcement: "2021-02-18 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "SBI logo",
      id_provider: "3",
      prize: "12000000",
      due_date: "2021-03-03 00:00:00",
      description: "We are a mid - size commercial general contractor / construction company. We manage building projects and carpentry projects for commercial clients. Target audience is both repeat commercial customers (think construction managers for large companies) and small business owners looking for a builder for their once in a lifetime projects.",
      id_status_contest: "1",
      announcement: "2021-03-10 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Insurants",
      id_provider: "3",
      prize: "15000000",
      due_date: "2021-01-24 00:00:00",
      description: "This will be a logo for a Vlog channel. It will be distributed on Youtube, Facebook, Linkedin, Twitter, our website, and the new clubhouse app.We are an Insurance technology company, our founder is going to be the host of a weekly video podcast/ vlog. He is an expert in insurance, he will be using his expertise by answering questions that were submitted to us about insurance. He is very passionate so we expect one or two rants each show about how broken and frustrating the insurance industry is. Our company colors are #ffb400 and #4a4a4a they don't need to be incorporated but colors would need to be complementary. Moodboard: I kinda like Joe Rogans podcast logo but not as intense. So incorporating Joes face could be a good angle.",
      id_status_contest: "2",
      announcement: "2021-01-24 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Design an iconic logo for a cutting edge business",
      id_provider: "4",
      prize: "5000000",
      due_date: "2021-02-20 00:00:00",
      description: "The Inn Marketplace is a site dedicated to serving the bed and breakfast/hospitality industry. It's primary function will be to showcase Inns for sale in an easily searchable format. In addition, the site will have sections related to marketing services, job opportunities, vendors, conferences, seminars, resources for aspiring innkeepers and state/regional/national Associations.",
      id_status_contest: "1",
      announcement: "2021-02-25 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Mining Services Start-Up",
      id_provider: "4",
      prize: "10000000",
      due_date: "2021-02-15 00:00:00",
      description: "We will provide rural mining operations a wide variety of services from labour, to equipment rentals, to the supply of goods.",
      id_status_contest: "1",
      announcement: "2021-02-17 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "We need a strong logo to help build our brand.",
      id_provider: "4",
      prize: "12000000",
      due_date: "2021-03-03 00:00:00",
      description: "We are mortgage lenders. Our target audience are homeowners.",
      id_status_contest: "1",
      announcement: "2021-03-07 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Need a super cozy logo to highlight our Cozy Cabin experience.",
      id_provider: "4",
      prize: "15000000",
      due_date: "2021-01-24 00:00:00",
      description: "We do vacation rentals in a resort town with a big beautiful blue lake and mountains. We target a wide range of people but mostly it is families and family reunions.",
      id_status_contest: "2",
      announcement: "2021-01-24 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Design a simple logo for USA hand made winter hats and scarfs startup",
      id_provider: "5",
      prize: "5000000",
      due_date: "2021-02-20 00:00:00",
      description: "We sell winter hats, beanies, scarves hand made in the Pacific Northwest of USA.",
      id_status_contest: "1",
      announcement: "2021-02-25 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "I need a Logo for my Kitchen Brand",
      id_provider: "5",
      prize: "10000000",
      due_date: "2021-02-15 00:00:00",
      description: "I am selling Kitchen Products online.",
      id_status_contest: "1",
      announcement: "2021-02-20 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Eagle Gate Apartments",
      id_provider: "5",
      prize: "120000000",
      due_date: "2021-03-03 00:00:00",
      description: "Apartment homes in in a down town setting advertised as luxury for a sophisticated client.",
      id_status_contest: "1",
      announcement: "2021-03-07 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Design Your Life",
      id_provider: "5",
      prize: "20000000",
      due_date: "2021-01-24 00:00:00",
      description: "Let us know how do you think about your self-design life.",
      id_status_contest: "2",
      announcement: "2021-01-24 00:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('contest', null, {})
  }
};
