import React from "react";

function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

//It will not pre-render thie page.
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "NUTJP",
    },
  };
}
