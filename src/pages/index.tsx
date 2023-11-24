import { Button } from "@/components/Button/Button";

import { Header } from "../modules/Header/Header";

import { Input } from "@/components/Inputfields/Inputfield";
import { Footer } from "@/modules/Footer/Footer";
import { Hero } from "@/modules/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header
        pageList={[
          { page: { href: "./spil", pageTitle: "Spil" } },
          { page: { href: "./priser", pageTitle: "Priser" } },
          {
            page: {
              href: "./events",
              pageTitle: "Events",
              subPages: [
                { href: "/foedselsdag", pageTitle: "Fødselsdag" },
                { href: "/turneringer", pageTitle: "Turneringer" },
                { href: "/firma-events", pageTitle: "Firma Events" },
              ],
            },
          },
          { page: { href: "/om-os", pageTitle: "Om os", subPages: [{ href: "/kontakt", pageTitle: "Kontakt os" }] } },
        ]}
      />

      <Hero
        header="Dk's bedste gaming center"
        redWord="bedste"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        buttonLabel="Book Nu"
      />

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu quam sed augue ultrices cursus. Vivamus eget metus
        at sapien mollis auctor. Mauris ac odio non arcu sollicitudin ultrices. Nullam in tempor mauris. Pellentesque pharetra
        tincidunt venenatis. Nulla purus ligula, convallis sodales blandit ut, iaculis vel nunc. Suspendisse nulla nulla,
        convallis id dolor vitae, vestibulum gravida ipsum. Donec blandit tristique tristique. Aenean interdum finibus ante nec
        vulputate. Phasellus quis tincidunt quam. Donec nec fringilla arcu, in rutrum enim. Vestibulum vitae dolor eget ante
        feugiat placerat. In non condimentum lectus, ut suscipit felis. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Integer congue, mi vitae fermentum ultrices, elit mauris accumsan ex, nec facilisis turpis
        turpis id metus. Sed rhoncus purus id nulla elementum, a congue nulla mollis. Sed aliquam arcu sed dolor varius, a
        pulvinar enim sagittis. Nullam arcu justo, commodo ut posuere quis, venenatis sit amet urna. Nam blandit eros porttitor
        libero auctor, id dictum felis tempus. Sed accumsan tincidunt ipsum, sed tincidunt lacus venenatis placerat. Praesent quis
        magna suscipit, tristique urna id, congue leo. Donec at dolor pretium, ultrices massa sit amet, pharetra libero. Mauris eu
        vestibulum nulla. Fusce convallis diam lacus, at mattis massa porta eu. Vivamus tincidunt, ligula sed elementum dictum,
        odio dolor suscipit lorem, et fermentum libero elit sed mauris. Praesent non elit eget sem tempus gravida nec et ligula.
        Cras sagittis convallis nisi, at ultricies ante lacinia vitae. Sed volutpat luctus sem non accumsan. Sed venenatis eros in
        diam molestie dapibus. Nulla mollis congue fringilla. Vivamus velit ex, aliquam eu porta et, maximus eu erat. Morbi congue
        arcu vitae est lacinia lacinia. Ut id orci efficitur, imperdiet eros ut, malesuada eros. Nullam ut euismod lectus. Nullam
        in rhoncus odio, quis rhoncus leo. Donec non nisi quis justo feugiat dignissim. Proin sed eros quis velit placerat congue
        sed a sapien. Duis et nibh sit amet sem imperdiet vulputate. Etiam vel massa vel nibh aliquet hendrerit. Curabitur nulla
        leo, blandit feugiat enim et, porta lobortis nisi. Vivamus et semper metus. Morbi porttitor tincidunt turpis cursus
        suscipit. Aenean elit velit, pellentesque vehicula tincidunt at, cursus nec mi. Etiam eget erat orci. Nulla eu blandit
        nisi. Sed nulla felis, sodales in pulvinar in, ornare quis sapien. Suspendisse et purus sed nisi venenatis convallis.
        Phasellus ultricies metus quis turpis tincidunt laoreet. Nunc sollicitudin efficitur nisi ac finibus. Integer a nisi ac mi
        gravida congue non at nulla. Maecenas vitae eros eu leo lobortis sodales in vel nulla. Vivamus sollicitudin congue lacus,
        eget gravida lorem dapibus sit amet. Aliquam sed purus rhoncus, tempor velit eget, dignissim enim. In sollicitudin eget
        mauris ut consectetur. Quisque semper orci orci, in rhoncus neque consequat a. Curabitur lectus massa, scelerisque a velit
        vel, vulputate vehicula nisl. Vestibulum sed turpis turpis. Aenean porttitor metus tincidunt faucibus luctus. Pellentesque
        luctus metus odio, a rutrum sem aliquet sit amet. Donec lectus diam, interdum id tellus id, sodales ornare nunc. Sed
        pulvinar auctor rutrum. Sed porttitor, ex eget laoreet volutpat, quam dolor facilisis purus.
      </div>

      <Input labelText="Label text"></Input>
      <Input labelText="Label another text"></Input>
      <Footer />
    </>
  );
}
