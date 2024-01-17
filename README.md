<!-- Improved compatibility of back to top link -->
<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="src/assets/vault-logo.svg" alt="Logo" width="80" height="80">

  <h3 align="center">vault-gui</h3>

  <p align="center">
    GUI for Vault KV2 stores made with solid.js and tauri
    <br />
    <a href="https://github.com/adfinis/vault-gui/releases"><strong>Download »</strong></a>
    <br />
    <br />
    <a href="https://github.com/adfinis/vault-gui/issues">Report Bug</a>
    ·
    <a href="https://github.com/adfinis/vault-gui/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![vault-gui Screenshot][product-screenshot]](https://github.com/adfinis/vault-gui)

This project aims to provide a simple desktop app to perform CRUD operations on a Hashicorp vault instances, focussed on KV2 engines.

Features:
* Faster than the official web ui
* Local search indexing
* Tree-style navigation
* Runs Linux, Windows, and MacOS

There are a lot more features planned for the future!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Tauri][Tauri]][Tauri-url]

[![Solid.js][Solid]][Solid-url]

[![Tailwind][Tailwind]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Downloading
You can find the latest version on the [releases](https://github.com/adfinis/vault-gui/releases) page.

### Local development

1. Clone the repo
   ```sh
   git clone https://github.com/adfinis/vault-gui
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Run the dev version
   ```sh
   pnpm dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Soon to follow.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Basic UI
    - [x] Tree view
    - [x] List view
    - [x] Secret view
- [x] Search
    [x] Local Search index
- [ ] CRUD
    - [ ] Create
    - [x] Read
    - [ ] Update
    - [ ] Delete
- [ ] Login methods
    - [ ] Token
    - [x] OIDC
    - [ ] Userpass
    - [ ] Approle
    - [ ] AWS

See the [open issues](https://github.com/adfinis/vault-gui/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'something(scope): Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Adfinis - [https://adfinis.com](https://adfinis.com) - support@adfinis.com

Project Link: [https://github.com/adfinis/vault-gui](https://github.com/adfinis/vault-gui)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Img Shields](https://shields.io)
* [vaultrs](https://github.com/jmgilman/vaultrs)
* [Solid Heroicons](https://github.com/amoutonbrady/solid-heroicons)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/adfinis/vault-gui.svg?style=for-the-badge
[contributors-url]: https://github.com/adfinis/vault-gui/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/adfinis/vault-gui.svg?style=for-the-badge
[forks-url]: https://github.com/adfinis/vault-gui/network/members
[stars-shield]: https://img.shields.io/github/stars/adfinis/vault-gui.svg?style=for-the-badge
[stars-url]: https://github.com/adfinis/vault-gui/stargazers
[issues-shield]: https://img.shields.io/github/issues/adfinis/vault-gui.svg?style=for-the-badge
[issues-url]: https://github.com/adfinis/vault-gui/issues
[license-shield]: https://img.shields.io/github/license/adfinis/vault-gui.svg?style=for-the-badge
[license-url]: https://github.com/adfinis/vault-gui/blob/main/LICENSE
[product-screenshot]: https://placehold.co/600x400
[Tauri]: https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF
[Tauri-url]: https://tauri.app/
[Tailwind]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Solid]: https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb
[Solid-url]: https://www.solidjs.com/
