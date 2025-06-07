function main() {
  const radky = document.getElementsByClassName("predmet-radek");

  const platne_znamky = ["1", "1-", "2", "2-", "3", "3-", "4", "4-", "5"];
  const vaha_typu_znamky = {
    A: 10,
    B: 9,
    C: 8,
    D: 7,
    E: 6,
    F: 5,
    G: 4,
    H: 3,
    I: 2,
    J: 1,
  };

  // Pro kazdy predmet (radek)
  for (let i = 0; i < radky.length; i++) {
    const predmet_radek = radky[i];

    // Ziskat vsechny elementy co primo obsahuji znamky
    const znamky_elements = predmet_radek.getElementsByClassName("ob");

    let znamky = [];
    let vahy = [];

    // Ziskame vahy znamek
    const zn_elements = predmet_radek.querySelectorAll(
      ".bx-wrapper > .bx-viewport > .znamky > .znamka-v"
    );

    for (let zindex = 0; zindex < zn_elements.length; zindex++) {
      let znamka_element = zn_elements[zindex].children[0];

      const cislovka_str =
        znamka_element.querySelector(".cislovka > .ob").innerText;
      const vaha_str =
        znamka_element.querySelector(".dodatek").children[0].innerText;

      // Pokud to je "informativni" znamka jako napr. nehodnocen nebo splneno tak preskocime na dalsi znamku
      // Take preskocime pokud vaha neexistuje
      if (!(cislovka_str in platne_znamky) || !(vaha_str in vaha_typu_znamky)) {
        continue;
      }

      const znamka_int = parseInt(cislovka_str);
      const vaha_int = vaha_typu_znamky[vaha_str];

      znamky.push(znamka_int);
      vahy.push(vaha_int);
    }

    // Vypocitat aritmeticky prumer
    let suma_znamek = 0;

    znamky.forEach((znamka) => {
      suma_znamek += znamka;
    });

    // Vypocitat vazeny prumer
    let suma_vazenych_znamek = 0;
    for (let i = 0; i < znamky.length; i++) {
      suma_vazenych_znamek += znamky[i] * vahy[i];
    }

    let suma_vah = 0;
    vahy.forEach((vaha) => {
      suma_vah += vaha;
    });

    let vazeny_prumer = suma_vazenych_znamek / suma_vah;

    let info_text_element = predmet_radek.querySelector(
      ".leva > ._subject_detail > .info-text"
    );

    // Zaokrouhlime na 2 desetinna mista
    info_text_element.innerText = `Průměr: ${
      Math.round(vazeny_prumer * 100) / 100
    }`;
  }
}

// Aby se stranka stihla nacist
setTimeout(main, 2000);
