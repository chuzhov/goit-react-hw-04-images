import { Oval } from 'react-loader-spinner';

//This is not a module, it's just a template to replace my code at ImageGallery module
//to meet the requirements of the test.
//I've replaced a custom spinner with my multi-functional modal window.
//This template could be wrapped around with an arrow function if I have enough time for it.
{
  this.state.isLoading && (
    <Oval
      height={80}
      width={80}
      color="#3ea2b8"
      wrapperStyle={{ position: 'absolute', top: '45%', left: '45%' }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#0d657b"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
