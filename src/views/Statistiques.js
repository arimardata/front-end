import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";

import fetchApi from "../utils/fetchApi";

import CircularProgress from "@material-ui/core/CircularProgress";
import { EvStationSharp } from "@material-ui/icons";

const Statistiques = ({ smallStatsPersonnels }) => {
  const [statis, setStatis] = useState({});

  const fetchStatistiques = async () => {
    const data = await fetchApi({
      method: "GET",

      url: "/api/statistiques/countByEtat",
      token: window.localStorage.getItem("token")
    });
    setStatis(data);
  };

  fetchStatistiques();

  if (statis.aos) {
    const smallStatsAos = [
      {
        label: "Total d'appels d'offres ",
        value: statis.aos.Total,
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "Retenus",
        value: statis.aos.Retenu,
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "Non Retenus",
        value: statis.aos.Non_Accepte,
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },
      {
        label: "En attente",
        value: statis.aos.Postule,
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 2, 3, 2, 4, 5, 4]
          }
        ]
      },
      {
        label: "Favoris",
        value: statis.aos.Favoris,
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "A Modifier",
        value: statis.aos.A_Modifier,
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 5, 3, 1, 2, 5, 7]
          }
        ]
      },
      {
        label: "Finis",
        value: statis.aos.Finis,
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 6, 1, 2, 3, 7, 8]
          }
        ]
      },
      {
        label: "Projet",
        value: statis.aos.Projets,
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 1, 3, 7, 4, 5, 8]
          }
        ]
      }
    ];
    const smallStatsMateriels = [
      {
        label: "Total Materiels de l'entreprise ",
        value: statis.materiels.Total,
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "Consommable",
        value: statis.materiels.consomable,
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "Non consommable",
        value: statis.materiels.nonConsomable,
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      }
    ];

    const smallStatsPersonnels = [
      {
        label: "Total personnels de l'entreprise",
        value: statis.personnels.Total,
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "Administratif",
        value: statis.personnels.administratif,
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "Permanent",
        value: statis.personnels.permanent,
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },
      {
        label: "Saisonier",
        value: statis.personnels.saisonier,
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 2, 3, 2, 4, 5, 4]
          }
        ]
      }
    ];

    const total = parseInt(statis.aos.Total);
    const retenu = (parseInt(statis.aos.Retenu) / total) * 100;
    const non_Accepte = (parseInt(statis.aos.Non_Accepte) / total) * 100;
    const postule = (parseInt(statis.aos.Postule) / total) * 100;
    const amodifier = (parseInt(statis.aos.A_Modifier) / total) * 100;
    const finis = (parseInt(statis.aos.Finis) / total) * 100;
    const projets = (parseInt(statis.aos.Projets) / total) * 100;
    const favoris = (parseInt(statis.aos.Favoris) / total) * 100;

    const data = [
      retenu,
      non_Accepte,
      postule,
      amodifier,
      finis,
      projets,
      favoris
    ];
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Statistiques"
            subtitle="Appel D'Offres / Personnels / Materiels"
            className="text-sm-left mb-3"
          />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {smallStatsAos.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg="6" md="6" sm="12" className="mb-4">
            <UsersByDevice data={data} />
          </Col>
        </Row>

        <Row>
          {smallStatsMateriels.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {smallStatsPersonnels.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  } else {
    return (
      <div style={{ height: "100%" }}>
        <center style={{ marginTop: 100, marginBottom: 100 }}>
          <CircularProgress disableShrink />
        </center>
      </div>
    );
  }
};

Statistiques.defaultProps = {};

export default Statistiques;
