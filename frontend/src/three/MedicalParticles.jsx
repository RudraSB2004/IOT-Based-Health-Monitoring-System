import Particles from "react-tsparticles";

const MedicalParticles = () => {
  return (
    <Particles
      options={{
        background: {
          color: {
            value: "#020617",
          },
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 80,
          },

          color: {
            value: "#00ffff",
          },

          links: {
            enable: true,
            color: "#00ffff",
          },

          move: {
            enable: true,
            speed: 1,
          },
        },
      }}
    />
  );
};

export default MedicalParticles;
