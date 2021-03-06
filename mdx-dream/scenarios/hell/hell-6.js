export default {
  apollo: {
    availableChiottes: {
      query: GET_AVAILABLE_CHIOTTES,
      variables () {
        return { agenceId: this.agenceId };
      },
      skip () {
        return !this.agenceId;
      },
      update: (data) => data.agence.availableChiottes,
      subscribeToMore: [
        {
          document: ON_PARTICIPANT_JOIN,
          variables () {
            return { agenceId: this.agenceId };
          },
          updateQuery (previousResult, { subscriptionData }) {
            return {
              ...previousResult,
              agence: {
                ...previousResult.agence,
                availableChiottes: [
                  ...previousResult.agence.availableChiottes,
                  subscriptionData.data.participantJoin.chiote
                ]
              }
            }
          } 
        },
        {
          document: ON_PARTICIPANT_LEFT,
          variables () {
            return { agenceId: this.agenceId };
          },
          updateQuery (previousResult, { subscriptionData }) {
            const chioteIndex = previousResult.agence.availableChiottes.findIndex((chiote) => chiote.id === subscriptionData.data.participantLeft.id);

            return merge({
              agence: {
                availableChiottes: remove(previousResult.agence.availableChiottes, chioteIndex)
              }
            });
          } 
        },
      ]
    },

    $subscribe: [
      {
        query: ON_LUDO_3PM,
        variables () {
          return { ludoId: this.ludoId };
        },
        skip () {
          return this.me.id === this.ludoId;
        },
        result () {
          this.doNotUseChiotte = true
        } 
      },
      {
        query: ON_NERF_WAR_START,
        variables () {
          return { agenceId: this.agenceId };
        },
        skip () {
          return !this.agenceId;
        },
        result () {
          this.ongoingWar = true
        }
      },
    ],
  },

  computed: {
    chiotteToUse () {
      if (this.doNotUseChiotte) return;

      return this.availableChiottes?.[0];
    },
  },
}