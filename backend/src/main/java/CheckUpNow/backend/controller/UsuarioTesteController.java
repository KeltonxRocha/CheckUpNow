package checkupnow.backend.controller;

import checkupnow.backend.model.Usuario;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/teste")
public class UsuarioTesteController {

    private List<Usuario> usuarios = new ArrayList<>();

    public UsuarioTesteController() {
        // Criação de usuário teste ao iniciar
        usuarios.add(new Usuario("Kelton Fontenele Rocha", "keltonrocha07@gmail.com", "senhadokelton123", "masculino", "(85) 98170-5754", "12/09/2003"));
    }

    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarios;
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario login) {
        for (Usuario u : usuarios) {
            if (u.getEmail().equals(login.getEmail()) && u.getSenha().equals(login.getSenha())) {
                return "Login bem-sucedido!";
            }
        }
        return "Usuário ou senha inválidos.";
    }
}
