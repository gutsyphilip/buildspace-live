import HappeningRightNow from '../components/HappeningRightNow';
import PageLayout from '../components/PageLayout';
import Container from '../design-system/Container';
import PageLoader from '../design-system/PageLoader';
import useScript from '../hooks/useScript';
import { NextPageWithLayout } from './_app';


const Home: NextPageWithLayout = () => {

  // Load IVS tech
  const { loading, error } = useScript({
    src: "https://player.live-video.net/1.2.0/amazon-ivs-videojs-tech.min.js",
  });
  // Load IVS quality plugin
  const { loading: loadingPlugin, error: pluginError } = useScript({
    src: "https://player.live-video.net/1.2.0/amazon-ivs-quality-plugin.min.js",
  });

  if (loading || loadingPlugin) {
    return <PageLoader />;
  }

  if (error || pluginError) {
    return <p>Error!</p>;
  }


  return (
    <Container>
      <HappeningRightNow />
    </Container>
  )
}

Home.getLayout = (page) => <PageLayout>{page}</PageLayout>

export default Home


