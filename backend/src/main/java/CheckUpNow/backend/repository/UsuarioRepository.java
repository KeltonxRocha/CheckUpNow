package checkupnow.backend.repository;
import checkupnow.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email);
}