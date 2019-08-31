import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "shards-react";
import lanesLayout from "./lanesLayout";
import IconButton from "@material-ui/core/IconButton";
import fetchApi from "./fetchApi";
import FileSaver from "file-saver";



const downloadPdf = num_Ordre => async () => {
  const options = {
    method: "GET",
    headers: {
      "x-auth-token": window.localStorage.getItem("token")
    },
    responseType: "blob"
  };
  let response = await fetch(
    "http://localhost:8090/api/files/PDF" + num_Ordre,
    options
  );

  var downloadBlob, downloadURL, handledelete, handleedit;

  downloadBlob = function (data, fileName, mimeType) {
    var blob, url;

    blob = new Blob([data], {
      type: mimeType
    });
    url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function () {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  };

  downloadURL = function (data, fileName) {
    var a;
    a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = "display: none";
    a.click();
    a.remove();
  };

  // downloadBlob(response, "some-file.txt", "application/octet-binary");

  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          downloadBlob(
            value,
            "Numero_ordre_" + num_Ordre + ".pdf",
            "application/octet-binary"
          );
          controller.enqueue(value);
          push();
        });
      }

      push();
    }
  });
};

// const downloadRar = num_Ordre => async () => {
//   const options = {
//     method: "GET",
//     headers: {
//       "x-auth-token": window.localStorage.getItem("token")
//     },
//     responseType: "blob"
//   };
//   let response = await fetch(
//     "http://localhost:8080/api/files/" + num_Ordre,
//     options
//   );

//   var downloadBlob, downloadURL;

//   downloadBlob = function(data, fileName, mimeType) {
//     var blob, url;

//     blob = new Blob([data], {
//       type: mimeType
//     });
//     url = window.URL.createObjectURL(blob);
//     downloadURL(url, fileName);
//     setTimeout(function() {
//       return window.URL.revokeObjectURL(url);
//     }, 1000);
//   };

//   downloadURL = function(data, fileName) {
//     var a;
//     a = document.createElement("a");
//     a.href = data;
//     a.download = fileName;
//     document.body.appendChild(a);
//     a.style = "display: none";
//     a.click();
//     a.remove();
//   };

//   // downloadBlob(response, "some-file.txt", "application/octet-binary");

//   const reader = response.body.getReader();

//   const stream = new ReadableStream({
//     start(controller) {
//       let values = [];
//       function push() {
//         reader.read().then(({ done, value }) => {
//           if (done) {
//             controller.close();
//             return;
//           }

//           // downloadBlob(
//           //   value,
//           //   "Numero_ordre_" + num_Ordre + ".rar",
//           //   "application/octet-binary"
//           // );
//           // controller.enqueue(value);
//           values.push(...value);
//           // push();
//         });
//         console.log(values);
//       }
//       push();
//     }
//   })
//     .then(stream => new Response(stream))
//     .then(response => response.blob())
//     .then(blob => URL.createObjectURL(blob))
//     .then(url => console.log(url))
//     .catch(err => console.error(err));
// };

const AoModal = props => {




  const handledelete = id => async () => {
    console.log(props)


    fetchApi({
      method: "DELETE",
      url: "/api/projects/delete/" + id,
      token: window.localStorage.getItem("token")
    });

    props.toggle();


  };

  
  const handleedit = id => async() =>{
  
  };
  
  let data = props.data;
  return (
    <div>
      <div className="row">
        <div className="col-10">
          <p>{data.chef_ouvrage}</p>
        </div>
        <div className="col-1">
          <IconButton onClick={downloadPdf(data.num_Ordre)}>
            <i className="material-icons">picture_as_pdf</i>
          </IconButton>
        </div>
        <div className="col-1">
          <IconButton onClick={handledelete(data.id)}>
            <i className="material-icons">delete</i>
          </IconButton>
        </div>
        {/* <div className="col-1">
          <IconButton onClick={downloadRar(data.num_Ordre)}>
            <i className="material-icons">cloud_download</i>
          </IconButton>
        </div> */}
      </div>

      <hr />
      <div className="row">
        <div className="col">
          N° AO :<span>{data.num_AO}</span>
        </div>
        <div className="col">
          Mise en ligne :<span>{data.mise_en_ligne}</span>
        </div>
        <div className="col">
          type : <span>{data.type}</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          N° d'ordre :<span>{data.num_Ordre}</span>
        </div>
        <div className="col">
          Date limite :<span>{data.date_Limite}</span>
        </div>
        <div className="col">
          ville :<span>{data.ville}</span>
        </div>
      </div>
      <hr />
      <div>{data.autres_details}</div>
      <hr />
      <div>Estimation : </div>
      <br />
      <div>{data.estimation}</div>
      <hr />
      <div className="row">
        <div className="col">
          <div>Caution provisoire(CP) : </div>
          <br />
          <div>{data.caution}</div>
        </div>

        <div className="col">
          {data.etat === "Retenu" && data.cautionFinal && (
            <>
              <div>Caution final : </div>
              <br />
              <div>{data.cautionFinal}</div>
            </>
          )}
        </div>
      </div>

      <hr />
      {data.etat === "Archive Des Projets Non-Accepte" && data.moinsDisant && (
        <div className="row">
          <div className="col">
            <div>Le moins disant : </div>
            <br />
            <div>{data.moinsDisant}</div>
          </div>

          <div className="col">
            <>
              <div>Le montant : </div>
              <br />
              <div>{data.montant}</div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default AoModal;
