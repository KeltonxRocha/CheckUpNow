package checkupnow.backend.controller;

import checkupnow.backend.model.Consulta;
import checkupnow.backend.model.Usuario;
import checkupnow.backend.repository.ConsultaRepository;
import checkupnow.backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:3000")
@RestController
@RequestMapping("/api/consultas")
public class ConsultaController{

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Criar consulta
    @PostMapping
    public ResponseEntity<?> criarConsulta(@RequestBody Consulta consulta){
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(consulta.getUsuario().getId());

        consulta.setUsuario(usuarioOptional.get());
        consulta.setAtivo(true);
        Consulta salva = consultaRepository.save(consulta);

        return ResponseEntity.ok(salva);
    }

    // Listar consultas
    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> listarConsultasPorUsuario(@PathVariable Long id){
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if (usuarioOptional.isEmpty()){
            return ResponseEntity.badRequest().body("Usuário não encontrado.");
        }

        List<Consulta> consultas = consultaRepository.findByUsuarioId(id);
        return ResponseEntity.ok(consultas);
    }

    // Cancelar consulta
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelarConsulta(@PathVariable Long id) {
        Optional<Consulta> consultaOptional = consultaRepository.findById(id);

        if (consultaOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Consulta inexistente");
        }

        Consulta consulta = consultaOptional.get();
        consulta.setAtivo(false);
        consultaRepository.save(consulta);

        return ResponseEntity.ok("Consulta cancelada com sucesso.");
    }
}
