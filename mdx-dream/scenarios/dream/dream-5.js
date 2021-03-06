io.on('connnection', async (socket) => {
  const state = State(socket);

  state.update({ me: await $user.me() });

  socket.on('agence.join', async ({ agenceId }) => {
    state
      .merge(await $agence.getSnapshot({ agenceId }))
      .compute('selectedChiotte', () => socket.user.canChier && !state.ongoingWar && state.availableChiottes?.[0]);

    Micro.on('agence.snapshot.updated', agenceId, state.merge.bind(state));
  });

  socket.on('war.declare', () => {
    if (!state.agenceId) return;

    state.update({
      ongoingWar: true,
      accidents: {
        $push: random(state.agence.employees)
      }
    });
  });

  Game.tick(() => state.flush());
});