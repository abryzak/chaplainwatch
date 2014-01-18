if (Interventions.find().count() == 0) {
  Interventions.insert({
  	liquorAccordPrecinct: "valley",
  	reference: 1928,
  	type: 'First Aid',
  	respondingTo: 'city-safe',
  });
};