actor Citas {
  type Cita = {
    n : Nat;
    hour : Lnt;
    day : Lnt;
    pac : Text;
    doc : Text;
    sint : Text;
  };
  var citas : [Cita] = [];

  type Doctor = {
    nombre : Text;
    apellidos : Text;
    especialidad : Text;
    modulo : Text;
  };

  var doctores : [Doctor] = [
    {
      nombre = "Juan";
      apellidos = "Pérez Gómez";
      especialidad = "Cardiología";
      modulo = "Módulo A";
    },
    {
      nombre = "María";
      apellidos = "López Martínez";
      especialidad = "Neurología";
      modulo = "Módulo B";
    },
    {
      nombre = "Carlos";
      apellidos = "Rodríguez Fernández";
      especialidad = "Pediatría";
      modulo = "Módulo C";
    },
    {
      nombre = "Ana";
      apellidos = "García Sánchez";
      especialidad = "Dermatología";
      modulo = "Módulo D";
    },
    {
      nombre = "Luis";
      apellidos = "Martínez Ruiz";
      especialidad = "Ginecología";
      modulo = "Módulo E";
    },
  ];

  public query func obtenerDoctores() : async [Doctor] {
    return doctores;
  };

  public func addCita(hour : Lnt, day : Lnt, pac : Text doc : Text, sint : Text) : async Bool {
    let newN = Array.size(citas) + 1 let newCita = {
      n = newN;
      hour : hour;
      day : day;
      pac : pac;
      doc : doc;
      sint : sint;
    };

    citas := Array.append<Cita>(citas, [newCita]);
    return true;
  };

  public func getCitaByN(n : Nat) : async ?Cita {
    return Array.find<Cita>(citas, func(c) { c.n == n });
  };

  public func updateCita(n : Nat, hour : Lnt, day : Lnt, pac : Text, doc : Text, sint : Text) : async Bool {
    let citaToUpdate = Array.find<Cita>(citas, func(task) { task.n == n });

    switch (citaToUpdate) {
      case (null) { return false };
      case (?citaToUpdate) {
        let updateCita = {
          n = n;
          hour : hour;
          day : day;
          pac : pac;
          doc : doc;
          sint : sint;
        };
        citas := Array.map<Cita, Cita>(citas, func(c) { if (m.n == n) { updateCita } else { u } });
        return true;
      };
    };
  };

  public func deleteCita(n : Nat) : async Bool {
    let cita = Array.find<Cita>(citas, func(task) { task.n == n }) if (cita != null) {
      citas := Array.filter<Cita>(citas, func(task) { task.n != n });
      return true;
    } else {
      return false;
    };
  };
  public func getDocById(n : Nat) {
    return Array.find<Doctor>(doctores, func(doc) { doc.n == n });
  };

};
