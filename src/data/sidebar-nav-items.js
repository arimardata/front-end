export default function() {
  return [
    {
      title: "Statistiques",
      to: "/statistiques",
      htmlBefore: '<i class="material-icons">timeline</i>',
      htmlAfter: ""
    },
    {
      title: "Appeles d'offres",
      htmlBefore: '<i class="material-icons">gavel</i>',
      to: "/appelesOffres"
    },
    {
      title: "Gestion des personnels",
      htmlBefore: '<i class="material-icons">people</i>',
      to: "/personnels"
    },
    {
      title: "Gestion de stock",
      htmlBefore: '<i class="material-icons">local_shipping</i>',
      to: "/stock"
    },
    {
      title: "Gestion des cheques",
      htmlBefore: '<i class="material-icons">payment</i>',
      to: "/cheques"
    }
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview"
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables"
    // },
    // {
    //   title: "User Profile",
    //   htmlBefore: '<i class="material-icons">person</i>',
    //   to: "/user-profile-lite"
    // },
    // {
    //   title: "Errors",
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: "/errors"
    // }
  ];
}
