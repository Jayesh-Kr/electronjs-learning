const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node v(${versions.node()}), and Electron v(${versions.electron()})`

const func = async () => {
    const resp = document.getElementById("ping");
    const response = await window.versions.ping();
    resp.innerHTML = response ? response : "Koi value nhi aai"
};

func();