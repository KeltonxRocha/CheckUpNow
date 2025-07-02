package checkupnow.backend.controller;

import checkupnow.backend.model.Usuario;
import checkupnow.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registrar")
    public String registrar(@RequestBody Usuario novoUsuario) {
        Optional<Usuario> existente = usuarioRepository.findByEmail(novoUsuario.getEmail());

        if (existente.isPresent()) {
            return "Email já cadastrado.";
        }

        usuarioRepository.save(novoUsuario);
        return "Usuário registrado com sucesso!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario login) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(login.getEmail());

        if (usuario.isPresent() && usuario.get().getSenha().equals(login.getSenha())) {
            Usuario u = usuario.get();

            Map<String, Object> resposta = new HashMap<>();
            resposta.put("id", u.getId());
            resposta.put("nome", u.getNome());
            resposta.put("email", u.getEmail());

            return ResponseEntity.ok(resposta);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos.");
    }
}