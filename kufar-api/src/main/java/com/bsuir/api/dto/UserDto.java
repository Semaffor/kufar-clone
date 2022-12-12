package com.bsuir.api.dto;

import com.bsuir.kufar.entity.enums.Role;
import com.bsuir.kufar.entity.enums.StatusCode;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserDto {

    private Long id;
    private String login;
    private String registeredFromMessage;
    private Set<String> roles;
    private String lastVisit;
    private int totalAdv;
    private StatusCode statusCode;
    private boolean isBlocked;
    private String email;
}

//  const [rows, setRows] = React.useState([]);
//
//          const [fetching, loading, error] = useFetching(async () => {
//          const response = await UserService.findAllUsers();
//          console.log(response)
//          setRows(response);
//          })
//
//          useMemo(() => {
//          fetching()
//          }, [])